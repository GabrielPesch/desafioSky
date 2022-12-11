import { IUserLogin } from '../Validators/IZodSignInValidator';
import { IUserPayload } from '../Validators/IZodSignUpValidator';

export interface ILoginService {
  signUp(payload: IUserPayload): Promise<string>,
  signIn(payload: IUserLogin): Promise<string | undefined>,
}