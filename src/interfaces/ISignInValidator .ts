import { IUserLogin } from '../Validators/IZodSignInValidator';

export default interface ISignInValidator {
  validateBody(obj: unknown): Promise<IUserLogin>
}