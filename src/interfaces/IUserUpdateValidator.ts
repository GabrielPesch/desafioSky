import { IUserPayload } from './IUserPayload';

export default interface IUserUpdateValidator {
  validateBody(obj: unknown): Promise<IUserPayload>
}