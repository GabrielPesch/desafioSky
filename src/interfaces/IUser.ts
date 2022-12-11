import { z } from 'zod';

export const UserZodSchema = z.object({
  nome: z.string().min(3).max(100),
  email: z.string().min(6).max(255),
  senha: z.string().email(),
  telefones: z.array(
    z.object({
      ddd: z.number(),
      numero: z.number(),
    }),
  ),
  ultimo_login: z.date().optional(),
  _id: z.string().optional(),
});

export type IUser = z.infer<typeof UserZodSchema>;
