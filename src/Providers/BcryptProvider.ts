import * as brcyrpt from 'bcryptjs';
import IBcryptProvider from '../interfaces/IBcryptProvider';

export default class BcryptProvider implements IBcryptProvider {
  private _bcrypt;
  constructor() {
    this._bcrypt = brcyrpt;
  }

  async encrypt(payloadToEncrypt: string): Promise<string> {
    const salt = 10;
    const encriptedPayload = await this._bcrypt.hash(payloadToEncrypt, salt);

    return encriptedPayload;
  }

  async validate(payload: string, hashedPayload: string): Promise<boolean> {
    const isCorrectPassword = await this._bcrypt.compare(payload, hashedPayload);

    return isCorrectPassword;
  }
}