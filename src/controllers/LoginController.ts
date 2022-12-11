import { Request, Response } from 'express';
import { ILoginService } from '../interfaces/IloginService';
import ISignInValidator from '../interfaces/ISignInValidator ';
import ISignUpValidator from '../interfaces/ISignUpValidator ';

export default class LoginController {
  constructor(
    private _loginService: ILoginService,
    private _signUpvalidator: ISignUpValidator,
    private _signInvalidator: ISignInValidator,

  ) { }

  async signUp(req: Request, res: Response) {
    const payload = await this._signUpvalidator.validateBody(req.body);

    const token = await this._loginService.signUp(payload);
    res.status(200).json({ token });
  }

  async signIn(req: Request, res: Response) {
    const payload = await this._signInvalidator.validateBody(req.body);

    const token = await this._loginService.signIn(payload);

    res.status(200).json({ token });
  }
}