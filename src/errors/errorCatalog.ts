export enum ErrorTypes {
  ObjectNotFound = 'ObjectNotFound',
  InvalidMongoId = 'InvalidMongoId',
  UnauthorizedError = 'Unauthorized',
  EmailAlreadyRegistered = 'AlreadyRegistered',
  tokenNotFound = 'TokenNotFound',
  TokenExpiredError = 'jwt expired',
  JsonWebTokenError = 'jwt malformed',
}

type ErrorResponseObject = {
  message: string;
  httpStatus: number
};

export type ErrorCatalog = Record<ErrorTypes, ErrorResponseObject>;

export const errorCatalog: ErrorCatalog = {
  ObjectNotFound: {
    message: 'Object not found',
    httpStatus: 204,
  },
  InvalidMongoId: {
    message: 'Id must have 36 hexadecimal characters',
    httpStatus: 400,
  },
  Unauthorized: {
    message: 'Invalid email or password',
    httpStatus: 401,
  },
  AlreadyRegistered: {
    message: 'Email already registered',
    httpStatus: 226, 
  },
  TokenNotFound: {
    message: 'Token not found',
    httpStatus: 401, 
  },
  'jwt expired': {
    message: 'Jwt has Expired',
    httpStatus: 401, 
  },
  'jwt malformed': {
    message: 'Jwt malformed',
    httpStatus: 401, 
  },
};