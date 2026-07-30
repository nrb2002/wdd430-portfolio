// lib/projects-db.ts

import { sql } from "@vercel/postgres";

export interface Project {
  id: number;
  title: string;
  description: string;
  type: "opensource" | "school";
  technologies: string[];
  yearCompleted: number;
  link?: string;
}

export interface ProjectFilters {
  query: string;
  type?: "opensource" | "school";
  page: number;
}

const ITEMS_PER_PAGE = 6;

/**
 * Validate and sanitize a search query.
 *
 * URL parameters are controlled by the user,
 * so never trust searchParams directly.
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

/**
 * Validate the project type filter.
 */
function sanitizeProjectType(
  type?: string | null
): "opensource" | "school" | undefined {
  if (type === "opensource" || type === "school") {
    return type;
  }

  return undefined;
}

/**
 * Select all project fields.
 *
 * The database column is year_completed,
 * but the TypeScript property is yearCompleted.
 * The alias keeps the database result consistent
 * with the Project interface.
 */
const projectFields = `
  id,
  title,
  description,
  type,
  technologies,
  year_completed AS "yearCompleted",
  link
`;

/**
 * Fetch all projects and optionally filter by type.
 */
export async function getProjects(
  type?: string | null
): Promise<Project[]> {
  const sanitizedType = sanitizeProjectType(type);

  if (sanitizedType) {
    const { rows } = await sql<Project>`
      SELECT
        id,
        title,
        description,
        type,
        technologies,
        year_completed AS "yearCompleted",
        link
      FROM projects
      WHERE type = ${sanitizedType}
      ORDER BY id
    `;

    return rows;
  }

  const { rows } = await sql<Project>`
    SELECT
      id,
      title,
      description,
      type,
      technologies,
      year_completed AS "yearCompleted",
      link
    FROM projects
    ORDER BY id
  `;

  return rows;
}

/**
 * Fetch a single project by its ID.
 */
export async function getProjectById(
  id: number
): Promise<Project | null> {
  if (!Number.isInteger(id) || id < 1) {
    return null;
  }

  const { rows } = await sql<Project>`
    SELECT
      id,
      title,
      description,
      type,
      technologies,
      year_completed AS "yearCompleted",
      link
    FROM projects
    WHERE id = ${id}
  `;

  return rows[0] ?? null;
}

/**
 * Fetch filtered and paginated projects.
 *
 * Searches:
 * - title
 * - description
 * - type
 * - technologies
 *
 * Also supports filtering by project type.
 */
export async function fetchFilteredProjects({
  query,
  type,
  page,
}: ProjectFilters): Promise<Project[]> {
  const sanitizedQuery = sanitizeQuery(query);
  const sanitizedType = sanitizeProjectType(type);
  const sanitizedPage = sanitizePage(page);

  const offset =
    (sanitizedPage - 1) * ITEMS_PER_PAGE;

  const searchPattern = `%${sanitizedQuery}%`;

  if (sanitizedType) {
    const { rows } = await sql<Project>`
      SELECT
        id,
        title,
        description,
        type,
        technologies,
        year_completed AS "yearCompleted",
        link
      FROM projects
      WHERE
        type = ${sanitizedType}
        AND (
          title ILIKE ${searchPattern}
          OR description ILIKE ${searchPattern}
          OR type ILIKE ${searchPattern}
          OR EXISTS (
            SELECT 1
            FROM unnest(technologies) AS technology
            WHERE technology ILIKE ${searchPattern}
          )
        )
      ORDER BY id
      LIMIT ${ITEMS_PER_PAGE}
      OFFSET ${offset}
    `;

    return rows;
  }

  const { rows } = await sql<Project>`
    SELECT
      id,
      title,
      description,
      type,
      technologies,
      year_completed AS "yearCompleted",
      link
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
 * Count total pages for filtered projects.
 *
 * Uses the same search and type filters
 * as fetchFilteredProjects().
 */
export async function fetchProjectsPages({
  query,
  type,
}: {
  query: string;
  type?: "opensource" | "school";
}): Promise<number> {
  const sanitizedQuery = sanitizeQuery(query);
  const sanitizedType = sanitizeProjectType(type);

  const searchPattern = `%${sanitizedQuery}%`;

  let count: number;

  if (sanitizedType) {
    const { rows } = await sql<{ count: number }>`
      SELECT COUNT(*)::int AS count
      FROM projects
      WHERE
        type = ${sanitizedType}
        AND (
          title ILIKE ${searchPattern}
          OR description ILIKE ${searchPattern}
          OR type ILIKE ${searchPattern}
          OR EXISTS (
            SELECT 1
            FROM unnest(technologies) AS technology
            WHERE technology ILIKE ${searchPattern}
          )
        )
    `;

    count = rows[0].count;
  } else {
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

    count = rows[0].count;
  }

  return Math.ceil(count / ITEMS_PER_PAGE);
}

// Select the latest 2 projects
export async function getLatestProjects(
  limit: number = 2
): Promise<Project[]> {
  const { rows } = await sql<Project>`
    SELECT
      id,
      title,
      description,
      type,
      technologies,
      year_completed AS "yearCompleted",
      link
    FROM projects
    ORDER BY year_completed DESC, id DESC
    LIMIT ${limit}
  `;

  return rows;
}