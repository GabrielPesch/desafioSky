import LoginController from '../controllers/LoginController';
import User from '../models/UserModel';
import BcryptProvider from '../Providers/BcryptProvider';
import JwtProvider from '../Providers/JwtProvider';
import LoginService from '../Services/LoginService';
import IZodSignUpValidator from '../Validators/IZodSignUpValidator';
import IZodSignInValidator from '../Validators/IZodSignInValidator';

export default class LoginControllerFactory {
  static make() {
    const userModel = new User();
    const bcryptProvider = new BcryptProvider();
    const jwtProvider = new JwtProvider();
    const loginService = new LoginService(
      userModel,
      bcryptProvider, 
      jwtProvider,
    );
    const signUpValidator = new IZodSignUpValidator();
    const signInValidator = new IZodSignInValidator();
    
    const loginController = new LoginController(loginService, signUpValidator, signInValidator);

    return loginController;
  }
}