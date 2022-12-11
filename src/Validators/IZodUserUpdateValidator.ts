import { z, ZodSchema } from 'zod';
import { IUserPayload } from '../interfaces/IUserPayload';

const signUpBodySchema = z.object({
  nome: z.string().min(3).max(100).optional(),
  senha: z.string().min(6).max(255).optional(),
  email: z.string().email().optional(),
  telefones: z.array(
    z.object({
      ddd: z.number(),
      numero: z.number(),
    }),
  ).optional(),
});

export default class IZodUserUpdateValidator {
  private _schema: ZodSchema<unknown>;

  constructor() {
    this._schema = signUpBodySchema;
  }

  async validateBody(obj: unknown) {
    const data = await this._schema.parseAsync(obj);

    return data as IUserPayload;
  }
}