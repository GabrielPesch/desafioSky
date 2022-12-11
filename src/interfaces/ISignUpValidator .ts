import { IUserPayload } from '../Validators/IZodSignUpValidator';

export default interface ISignUpValidator {
  validateBody(obj: unknown): Promise<IUserPayload>
}