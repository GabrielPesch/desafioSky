import { z, ZodSchema } from 'zod';

const signUpBodySchema = z.object({
  nome: z.string().min(3).max(100),
  senha: z.string().min(6).max(255),
  email: z.string().email(),
  telefones: z.array(
    z.object({
      ddd: z.number(),
      numero: z.number(),
    }),
  ),
});

export type IUserPayload = z.infer<typeof signUpBodySchema>;

export default class IZodSignUpValidator {
  private _schema: ZodSchema<unknown>;

  constructor() {
    this._schema = signUpBodySchema;
  }

  async validateBody(obj: unknown) {
    const data = await this._schema.parseAsync(obj);

    return data as IUserPayload;
  }
}