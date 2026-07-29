// app/lib/actions.ts

"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const ProjectFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters.")
    .max(100, "Title is too long."),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters.")
    .max(1000, "Description is too long."),

  type: z.enum(["opensource", "school"]),

  technologies: z
    .string()
    .trim()
    .min(2, "Please enter at least one technology."),

  // Optional project URL
  link: z
    .string()
    .trim()
    .url("Please enter a valid URL.")
    .optional()
    .or(z.literal("")),
});

export async function createProject(formData: FormData) {
  try{
    const raw = {
      title: formData.get("title"),
      description: formData.get("description"),
      type: formData.get("type"),
      technologies: formData.get("technologies"),
      link: formData.get("link"),
    };

    const parsed =
      ProjectFormSchema.safeParse(raw);

    if (!parsed.success) {
      throw new Error(
        "Invalid project input."
      );
    }

    const {
      title,
      description,
      type,
      technologies,
      link,
    } = parsed.data;

    const technologyArray = technologies
      .split(",")
      .map((technology) => technology.trim())
      .filter(Boolean);

    await sql`
      INSERT INTO projects (
        title,
        description,
        type,
        technologies,
        link
      )
      VALUES (
        ${title},
        ${description},
        ${type},
        ${technologyArray},
        ${link || null}
      )
    `;

  } catch(error){
    console.error('Error creating new project:', error);
    throw new Error('Unable to create project. Please try again later.');
  }

  revalidatePath("/projects");
  redirect("/projects");
}

export async function updateProject(id: string, formData: FormData) {
  try{
    const projectId = Number(id);

    if (
      !Number.isInteger(projectId) ||
      projectId < 1
    ) {
      throw new Error("Invalid project ID.");
    }

    const raw = {
      title: formData.get("title"),
      description: formData.get("description"),
      type: formData.get("type"),
      technologies: formData.get("technologies"),
      link: formData.get("link"),
    };

    const parsed =
      ProjectFormSchema.safeParse(raw);

    if (!parsed.success) {
      throw new Error(
        "Invalid project input."
      );
    }

    const {
      title,
      description,
      type,
      technologies,
      link,
    } = parsed.data;

    const technologyArray = technologies
      .split(",")
      .map((technology) => technology.trim())
      .filter(Boolean);

    await sql`
      UPDATE projects
      SET
        title = ${title},
        description = ${description},
        type = ${type},
        technologies = ${technologyArray},
        link = ${link || null}
      WHERE id = ${projectId}
    `;

  }catch(error){
    console.error('Error updating project:', error);
    throw new Error('Unable to update project. Please try again later.');
  }

  revalidatePath("/projects");
  redirect("/projects");
}

export async function deleteProject(id: string) {
  try{
    const projectId = Number(id);

    if (
      !Number.isInteger(projectId) ||
      projectId < 1
    ) {
      throw new Error("Invalid project ID.");
    }

    await sql`
      DELETE FROM projects
      WHERE id = ${projectId}
    `;

  }catch(error){
    console.error('Error deleting project:', error);
    throw new Error('Unable to delete project. Please try again later.');
  }

  revalidatePath("/projects");

  redirect("/projects");
}