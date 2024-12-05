import * as z from "zod"

export const createSousBlocSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  image: z.string().url("L'URL de l'image doit être valide"),
  description: z.string().min(1, "La description est requise"),
  url: z.string().url("L'URL doit être valide"),
})
export const createBlockShema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  subBlocks: z.array(createSousBlocSchema),
})





export type CreateSousBlockType = z.infer<typeof createSousBlocSchema>

export type BlockType = z.infer<typeof createBlockShema>
export type CreateBlockType = z.infer<typeof createBlockShema>