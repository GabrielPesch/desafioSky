import { Request, Response } from 'express';
import { IUserPayload } from '../interfaces/IUserPayload';
import { IUserService } from '../interfaces/IUserService';
import IUserUpdateValidator from '../interfaces/IUserUpdateValidator';

export default class UserController {
  constructor(
    private _userService: IUserService<IUserPayload>,
    private _validator: IUserUpdateValidator, 
  ) {}
  
  async getAll(req: Request, res: Response) {
    const users = await this._userService.getAll();

    res.status(200).json(users);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await this._userService.getById(id);
    
    res.status(200).json(user);
  }
  
  async update(req: Request, res: Response) {
    const { id } = req.params;

    const payload = await this._validator.validateBody(req.body);

    if (!payload) {
      return res.status(304);
    }

    const userUpdated = await this._userService.update(id, payload);

    return res.status(200).json(userUpdated);
  }
  
  async delete(req: Request, res: Response) {
    const { email } = req.headers.user as unknown as { email: string };
    await this._userService.delete(email);
    res.status(204);
  }
}