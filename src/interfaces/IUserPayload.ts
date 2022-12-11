import { JwtPayload } from 'jsonwebtoken';

export default interface IUser {
  nome: string,
  email: string,
  senha: string,
  telefones: {
    numero: number,
    ddd: number
  }[],
}

export interface IUserPayload extends Omit<IUser, 'senha'>, JwtPayload{}