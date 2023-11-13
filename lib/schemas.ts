import * as z from "zod";

export const attachmentSchema = z.object({
  url: z.string().url(),
  name: z.string().min(1).max(128),
  courseId: z.coerce.number().min(1),
});

export const chapterSchema = z.object({
  title: z.string().min(1).max(128),
  videoUrl: z.string().url(),
  description: z.string().min(1).max(512),

  position: z.coerce.number().min(0),
  courseId: z.coerce.number().min(1),
});

export const titleSchema = z.object({
  title: z.string().min(4).max(128),
});

export const priceSchema = z.object({
  price: z.coerce.number().min(0),
});

export const descriptionSchema = z.object({
  description: z.string().min(5).max(512),
});

export const courseImageUrlSchema = z.object({
  imageUrl: z.string().url(),
});
