import { z, ZodSchema } from 'zod';

const signInBodySchema = z.object({
  email: z.string().email(),
  senha: z.string().min(6).max(255),
});

export type IUserLogin = z.infer<typeof signInBodySchema>;

export default class ZodSignInValidator {
  private _schema: ZodSchema<unknown>;

  constructor() {
    this._schema = signInBodySchema;
  }

  async validateBody(obj: unknown) {
    const data = await this._schema.parseAsync(obj);

    return data as IUserLogin;
  }
}