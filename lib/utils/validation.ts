import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  full_name: z.string().min(2),
  role: z.enum(['recruiter', 'employee', 'both']),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const profileSchema = z.object({
  full_name: z.string().min(2),
  title: z.string().optional(),
  bio: z.string().optional(),
  skills: z.array(z.string()).optional(),
  location: z.string().optional(),
  experience: z.array(
    z.object({
      title: z.string(),
      company: z.string(),
      startDate: z.string(),
      endDate: z.string().optional(),
      description: z.string().optional(),
    })
  ).optional(),
});

export const jobSchema = z.object({
  title: z.string().min(2),
  company: z.string().min(2),
  description: z.string().min(10),
  requirements: z.array(z.string()),
  location: z.string().optional(),
  salary_range: z.object({
    min: z.number(),
    max: z.number(),
  }).optional(),
  job_type: z.string().optional(),
});

export const videoInterviewSchema = z.object({
  questions: z.array(z.string()),
  job_id: z.string().uuid(),
  candidate_id: z.string().uuid(),
});