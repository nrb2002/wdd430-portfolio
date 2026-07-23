// lib/projects-db.ts

import { sql } from "@vercel/postgres";

export interface Project {
  id: number;
  title: string;
  description: string;
  type: "opensource" | "school";
  technologies: string[];
  link?: string;
}

const ITEMS_PER_PAGE = 6;

/**
 * Validate and sanitize a search query.
 *
 * The URL is controlled by the user, so never trust
 * searchParams directly.
 */
function sanitizeQuery(query: string): string {
  return query
    .trim()
    .slice(0, 100)
    .replace(/[^\p{L}\p{N}\s._-]/gu, "");
}

/**
 * Validate the requested page number.
 */
function sanitizePage(page: number): number {
  if (!Number.isInteger(page) || page < 1) {
    return 1;
  }

  return page;
}

// Fetch all projects and optionally filter by type
export async function getProjects(
  type?: string | null
): Promise<Project[]> {
  if (type === "opensource" || type === "school") {
    const { rows } = await sql<Project>`
      SELECT *
      FROM projects
      WHERE type = ${type}
      ORDER BY id
    `;

    return rows;
  }

  const { rows } = await sql<Project>`
    SELECT *
    FROM projects
    ORDER BY id
  `;

  return rows;
}

// Fetch a single project by its ID
export async function getProjectById(
  id: number
): Promise<Project | null> {
  if (!Number.isInteger(id) || id < 1) {
    return null;
  }

  const { rows } = await sql<Project>`
    SELECT *
    FROM projects
    WHERE id = ${id}
  `;

  return rows[0] ?? null;
}

/**
 * Fetch filtered and paginated projects.
 *
 * Searches title, description, type, and technologies.
 */
export async function fetchFilteredProjects(
  query: string,
  page: number
): Promise<Project[]> {
  const sanitizedQuery = sanitizeQuery(query);
  const sanitizedPage = sanitizePage(page);

  const offset =
    (sanitizedPage - 1) * ITEMS_PER_PAGE;

  const searchPattern = `%${sanitizedQuery}%`;

  const { rows } = await sql<Project>`
    SELECT *
    FROM projects
    WHERE
      title ILIKE ${searchPattern}
      OR description ILIKE ${searchPattern}
      OR type ILIKE ${searchPattern}
      OR EXISTS (
        SELECT 1
        FROM unnest(technologies) AS technology
        WHERE technology ILIKE ${searchPattern}
      )
    ORDER BY id
    LIMIT ${ITEMS_PER_PAGE}
    OFFSET ${offset}
  `;

  return rows;
}

/**
 * Count the total number of pages for filtered projects.
 */
export async function fetchProjectsPages(
  query: string
): Promise<number> {
  const sanitizedQuery = sanitizeQuery(query);

  const searchPattern = `%${sanitizedQuery}%`;

  const { rows } = await sql<{ count: number }>`
    SELECT COUNT(*)::int AS count
    FROM projects
    WHERE
      title ILIKE ${searchPattern}
      OR description ILIKE ${searchPattern}
      OR type ILIKE ${searchPattern}
      OR EXISTS (
        SELECT 1
        FROM unnest(technologies) AS technology
        WHERE technology ILIKE ${searchPattern}
      )
  `;

  return Math.ceil(
    rows[0].count / ITEMS_PER_PAGE
  );
}

