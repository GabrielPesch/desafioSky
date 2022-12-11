import UserController from '../controllers/UserController';
import User from '../models/UserModel';
import BcryptProvider from '../Providers/BcryptProvider';
import UserService from '../Services/UserService';
import IZodUserUpdateValidator from '../Validators/IZodUserUpdateValidator';

export default class UserControllerFactory {
  static make() {
    const userModel = new User();
    const validator = new IZodUserUpdateValidator();
    const bcryptProvider = new BcryptProvider();
    const userService = new UserService(userModel, bcryptProvider);

    const userController = new UserController(userService, validator);

    return userController;
  }
}
