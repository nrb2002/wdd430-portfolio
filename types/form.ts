// lib/types/form.ts

export interface FormState {
  message: string | null;
  errors?: {
    title?: string[];
    description?: string[];
    type?: string[];
    technologies?: string[];
    yearCompleted?: string[];
    link?: string[];
  };
}