import { defineCollection, z } from 'astro:content';

const servicios = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().default('shield'),
    category: z.enum(['salud', 'vida', 'hogar', 'vehicular', 'empresas', 'art']),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    insurer: z.string().optional(),
    coverages: z.array(z.string()).optional(),
    pdfBrochure: z.string().optional(),
    pdfConditions: z.string().optional(),
    ctaText: z.string().default('Cotizar'),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  }),
});

const equipo = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string().default(''),
    image: z.string().optional(),
    linkedin: z.string().url().optional(),
    email: z.string().email().optional(),
    order: z.number().default(0),
    badge: z.string().optional(),
  }),
});

const nosotros = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    heroImage: z.string().optional(),
    category: z.string().default('Consejos'),
    tags: z.array(z.string()).default([]),
    author: z.string().default('Equipo Ase de la Cruz'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { servicios, equipo, nosotros, blog };