import LoginControllerFactory from './loginControllerFactory';
import UserControllerFactory from './userControllerFactory';

export const loginController = LoginControllerFactory.make();
export const userController = UserControllerFactory.make();
