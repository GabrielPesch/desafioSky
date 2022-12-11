import { model as mongooseCreateModel, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { ErrorTypes } from '../errors/errorCatalog';
import { IUser } from '../interfaces/IUser';
import MongoModel from './MongoModel';

const userMongooseSchema = new Schema <IUser>({
  _id: {
    type: String,
    default: uuidv4(),
  },
  nome: String,
  email: String,
  senha: String,
  telefones: [{
    numero: Number,
    ddd: Number,
  }],
  ultimo_login: Date,

}, { 
  versionKey: false,
  timestamps: {
    createdAt: 'data_criacao',
    updatedAt: 'data_atualizacao',
  }, 
});

class User extends MongoModel<IUser> {
  constructor(model = mongooseCreateModel('User', userMongooseSchema)) {
    super(model);
  }

  public async signIn(email: string) {
    const user = await this._model.findOne({ email });

    if (user) {
      const currentTime = new Date();
      user.ultimo_login = currentTime;

      await user.save();

      return user;
    }
    throw new Error(ErrorTypes.UnauthorizedError);
  }

  public async checkIfEmailExists(email: string): Promise<void> {
    const alreadyRegistered = await this._model.findOne({ email });

    if (alreadyRegistered) {
      throw new Error(ErrorTypes.EmailAlreadyRegistered);
    }
  }
}

export default User;