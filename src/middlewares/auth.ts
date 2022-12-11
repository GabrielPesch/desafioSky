import { NextFunction, Request, Response } from 'express';
import { ErrorTypes } from '../errors/errorCatalog';
import JwtProvider from '../Providers/JwtProvider';

const authentication = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  
  if (!auth) {
    throw new Error(ErrorTypes.tokenNotFound);
  }

  const token = auth.split(' ')[1];

  const jwtProvider = new JwtProvider();
  const user = jwtProvider.readToken(token);
  req.headers.user = user;
  next();
};

export default authentication;