import { ErrorTypes } from '../errors/errorCatalog';
import IBcryptProvider from '../interfaces/IBcryptProvider';
import IJwtProvider from '../interfaces/IJwtProvider';
import User from '../models/UserModel';
import { IUserLogin } from '../Validators/IZodSignInValidator';
import { IUserPayload } from '../Validators/IZodSignUpValidator';

export default class LoginService {
  constructor(
    private _userModel: User,
    private _bcryptProvider: IBcryptProvider,
    private _jwtProvider: IJwtProvider,
  ) { }

  async signUp(payload: IUserPayload): Promise<string> {
    await this._userModel.checkIfEmailExists(payload.email);

    const hashedPassword = await this._bcryptProvider.encrypt(payload.senha);
    
    const currentTime = new Date();

    const user = { ...payload, senha: hashedPassword, ultimo_login: currentTime };

    await this._userModel.create(user);

    const token = this._jwtProvider.generate({ email: user.email });

    return token;
  }

  async signIn({ email, senha }: IUserLogin): Promise<string> {
    const user = await this._userModel.findOne(email); 
    
    if (user) {
      await this._bcryptProvider.validate(senha, user.senha);
     
      await this._userModel.signIn(email);

      const token = this._jwtProvider.generate({ email });
      return token;
    }
    throw new Error(ErrorTypes.UnauthorizedError);
  }
}