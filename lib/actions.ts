// app/lib/actions.ts

"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

import { FormState } from "@/types/form"


// -------------------------
// Zod Schema
// -------------------------

const ProjectFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters."),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters."),

  type: z.enum(["opensource", "school"]),

  technologies: z
    .string()
    .trim()
    .min(2, "Please enter at least one technology."),

  yearCompleted: z.coerce
    .number()
    .int()
    .min(2000, "Year must be 2000 or later.")
    .max(
      new Date().getFullYear(),
      "Year cannot be in the future."
    ),

  link: z
    .string()
    .trim()
    .url("Please enter a valid URL.")
    .optional()
    .or(z.literal("")),
});

/*********************************************
 * Action to authenticate a user
 *********************************************/
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid email or password.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error; // re-throw so Next.js handles redirects correctly
  }
}

// -------------------------
// Project Actions
// -------------------------

export async function createProject(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  //Get values from FormData
  const raw = {
    title: formData.get("title"),
    description: formData.get("description"),
    type: formData.get("type"),
    technologies: formData.get("technologies"),
    yearCompleted: formData.get("yearCompleted"),
    link: formData.get("link"),
  };

  // Validate form data

  const parsed = ProjectFormSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      message: "Please correct the errors below.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const {
    title,
    description,
    type,
    technologies,
    yearCompleted,
    link,
  } = parsed.data;

  // Convert comma-separated technologies into a PostgreSQL text array
  const technologyArray = technologies
    .split(",")
    .map((technology) => technology.trim())
    .filter(Boolean);

  try {
    await sql`
      INSERT INTO projects (
        title,
        description,
        type,
        technologies,
        year_completed,
        link
      )
      VALUES (
        ${title},
        ${description},
        ${type},
        ${technologyArray},
        ${yearCompleted},
        ${link || null}
      )
    `;
  } catch (error) {
    console.error("Error creating project:", error);

    return {
      message:
        "Unable to create project. Please try again later.",
    };
  }

  // Refresh the projects page
  revalidatePath("/projects");

  // Redirect after successful creation
  redirect("/projects");
}

export async function updateProject(
  id: string, 
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
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
      yearCompleted: formData.get("yearCompleted"),
      link: formData.get("link"),
    };

    const parsed =
      ProjectFormSchema.safeParse(raw);

    if (!parsed.success) { 
      return { 
        message: "Please correct the errors below.", errors: parsed.error.flatten().fieldErrors, 
      }; 
    }

    const {
      title,
      description,
      type,
      technologies,
      yearCompleted,
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
        year_completed = ${yearCompleted},
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

