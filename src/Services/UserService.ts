import { ErrorTypes } from '../errors/errorCatalog';
import IBcryptProvider from '../interfaces/IBcryptProvider';
import User from '../models/UserModel';
import { IUserPayload } from '../Validators/IZodSignUpValidator';

export default class UserService {
  constructor(
    private _userModel: User,
    private _bcryptProvider: IBcryptProvider,
  ) {}

  async getAll() {
    return this._userModel.find();
  }

  async getById(id: string) {
    const user = await this._userModel.findById(id);
    if (user) {
      return user;
    } 
    throw new Error(ErrorTypes.ObjectNotFound);
  }
    
  async getByEmail(property: string) {
    const user = await this._userModel.findOne(property);
    if (user) {
      const { senha, ...restOfUser } = user;
      return restOfUser as IUserPayload;
    }
  }

  async update(id: string, payload: IUserPayload) {
    const user = payload;
    if (payload.senha) {
      const hashedPassword = await this._bcryptProvider.encrypt(payload.senha);
      user.senha = hashedPassword;
    }
    const updated = await this._userModel.update(id, user);
    
    if (!updated) { 
      throw new Error(ErrorTypes.ObjectNotFound); 
    }
    return updated;
  }

  async delete(email: string): Promise<undefined | void> {
    const deleted = await this._userModel.delete(email);
    if (!deleted) {
      throw new Error(ErrorTypes.ObjectNotFound);
    }
  }
}