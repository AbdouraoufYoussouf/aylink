import { SubBlocType } from "@prisma/client";
import * as z from "zod"

const baseSchema = z.object({
  id: z.string(),
  blocId: z.string().optional(),
  title: z.string().min(1, "Le titre est obligatoire"),
  description: z.string().min(1, "La description est requise"),
  isPrivate: z.boolean().default(false),
  isDisplay: z.boolean().default(true),
  isPaid: z.boolean().default(false),
  price:z.number().optional()
});

export const urlSchema = baseSchema.extend({
  type: z.literal(SubBlocType.URL),
  url: z.string().url("L'URL doit être valide"),
  imageFile: z.instanceof(File).optional(),
  imageUrl: z.string().url("L'URL de l'image doit être valide").optional(),
  altText: z.string().optional(),
  imageName: z.string().optional()
});

const productSchema = baseSchema.extend({
  type: z.literal(SubBlocType.PRODUCT),
  name: z.string().min(1, "Le nom du produit est obligatoire"),
  price: z.number().min(0, "Le prix doit être positif ou nul"),
  currency: z.string().default("EUR"),
  duration: z.string().optional(),
  stock: z.number().int().min(0, "Le stock doit être un nombre entier positif ou nul").optional(),
  imageFile: z.instanceof(File).optional(),
  imageUrl: z.string().optional(),
  popular: z.boolean().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  variants: z.array(z.object({
    name: z.string(),
    price: z.number().min(0),
    sku: z.string().optional(),
    stock: z.number().int().min(0).optional(),
  })).optional(),
  actionUrl: z.string().optional(),
  shortDescription: z.string().max(200, "La description courte ne doit pas dépasser 200 caractères").optional(),
  longDescription: z.string().optional(),
  specifications: z.record(z.string(), z.string()).optional(),
  relatedProducts: z.array(z.string()).optional(), // IDs of related products
});

const imageSchema = baseSchema.extend({
  type: z.literal(SubBlocType.IMAGE),
  imageFile: z.instanceof(File).optional(),
  imageUrl: z.string().url("L'URL de l'image doit être valide"),
  altText: z.string().optional(),
});

const documentSchema = baseSchema.extend({
  type: z.literal(SubBlocType.DOCUMENT),
  documentFile: z.instanceof(File).optional(),
  documentUrl: z.string().url("L'URL du document doit être valide"),
  fileType: z.string(), // e.g., "pdf", "docx", etc.
  fileSize: z.number().optional(),
});

export const videoSchema = baseSchema.extend({
  type: z.literal(SubBlocType.VIDEO),
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
  // productSchema
]);            


export const blocShema = z.object({
  id: z.string(),
  isDisplay:z.boolean().optional(),
  name: z.string().min(1, "Le titre est obligatoire"),
  subBlocs: z.array(createSousBlocSchema).optional(),
  products: z.array(productSchema).optional(),
})
export const updateBlocShema = z.object({
  blocId: z.string(),
  name: z.string().min(1, "Le titre est obligatoire"),
})
export const createBlocShema = z.object({
  name: z.string().min(1, "Le titre est obligatoire"),
})

export type VideoSubBlocType = z.infer<typeof videoSchema>
export type UrlSubBlocType = z.infer<typeof urlSchema>
export type ImageSubBlocType = z.infer<typeof imageSchema>
export type DocumentSubBlocType = z.infer<typeof documentSchema>
export type ProductSubBlocType = z.infer<typeof productSchema>

export type BlocType = z.infer<typeof blocShema>
export type CreateBlocType = z.infer<typeof createBlocShema>

export type SousBlocType = z.infer<typeof createSousBlocSchema>;

export type SubBlocTypeType = "URL" | "IMAGE" | "DOCUMENT" | "VIDEO";

