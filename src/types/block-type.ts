import * as z from "zod"

const baseSchema = z.object({
  id: z.string(),
  blocId: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "La description est requise"),
  isPrivate: z.boolean().default(false),
  isDisplay: z.boolean().default(true),
  isPaid: z.boolean().default(false),
  price:z.number().optional()
});

const urlSchema = baseSchema.extend({
  type: z.literal("URL"),
  url: z.string().url("L'URL doit être valide"),
  imageFile: z.instanceof(File).optional(),
  imageUrl: z.string().url("L'URL de l'image doit être valide").optional(),
  altText: z.string().optional(),
});


const imageSchema = baseSchema.extend({
  type: z.literal("IMAGE"),
  imageFile: z.instanceof(File).optional(),
  imageUrl: z.string().url("L'URL de l'image doit être valide"),
  altText: z.string().optional(),
});

const documentSchema = baseSchema.extend({
  type: z.literal("DOCUMENT"),
  documentFile: z.instanceof(File).optional(),
  documentUrl: z.string().url("L'URL du document doit être valide"),
  fileType: z.string(), // e.g., "pdf", "docx", etc.
  fileSize: z.number().optional(),
});

export const videoSchema = baseSchema.extend({
  type: z.literal("VIDEO"),
  videoUrl: z.string().optional(),
  videoFile: z.instanceof(File).optional(),
  thumbnailFile: z.instanceof(File).optional(),
  thumbnailUrl: z.string().optional(),
  duration: z.number().optional(),
  embedCode: z.string().optional(),
  actionType: z.enum(["URL", "FORM"]),
  actionUrl: z.string().optional(),
  actionFormId: z.string().optional(),
})


export const createSousBlocSchema = z.discriminatedUnion("type", [
  urlSchema,
  imageSchema,
  documentSchema,
  videoSchema,
]);            


export const createBlockShema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  subBlocks: z.array(createSousBlocSchema),
})

export type VideoSubBlocType = z.infer<typeof videoSchema>
export type UrlSubBlocType = z.infer<typeof urlSchema>
export type ImageSubBlocType = z.infer<typeof imageSchema>
export type DocumentSubBlocType = z.infer<typeof documentSchema>

export type BlockType = z.infer<typeof createBlockShema>
export type CreateBlockType = z.infer<typeof createBlockShema>

export type CreateSousBlockType = z.infer<typeof createSousBlocSchema>;

export type SubBlocTypeType = "URL" | "IMAGE" | "DOCUMENT" | "VIDEO";

