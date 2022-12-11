import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import IJwtProvider from '../interfaces/IJwtProvider';

export default class JwtProvider implements IJwtProvider {
  private _jwt;
  private _secret: string;
  private _signOptions: jwt.SignOptions;

  constructor() {
    this._jwt = jwt;
    this._secret = process.env.JWT_SECRET || 'jwt_secret';
    this._signOptions = { expiresIn: '30m', algorithm: 'HS256' };
  }

  generate(payload: string | object): string {
    const token = this._jwt.sign(payload, this._secret, this._signOptions);

    return token;
  }

  readToken(token: string) {
    let decodedMessage: unknown;
    this._jwt.verify(token, this._secret, (err, decoded) => {
      if (err) {
        throw err;
      }
      decodedMessage = decoded;
    });
    return decodedMessage as string;
  }
}
