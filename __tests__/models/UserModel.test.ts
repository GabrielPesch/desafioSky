//@ts-nocheck

import * as sinon from 'sinon';
import { expect } from 'chai';
import { Model } from 'mongoose';
import { EMAIL, userMock, usersMock, userUUID } from '../mocks/userMocks';
import User from '../../src/models/UserModel';
import { afterEach } from 'mocha';
import { ErrorTypes } from '../../src/errors/errorCatalog';
import { expect, use } from 'chai';
import { mongooseError, MONGOOSE_ERROR_MESSAGE } from '../utils';

const chaiAsPromised = require('chai-as-promised');

use(chaiAsPromised);

describe('User Model', () => {
  const userModel = new User()
  
  afterEach(sinon.restore);

  describe('find', () => {
    describe('Success', () => {
      it('Should return a list of Users', async () => {
        sinon.stub(Model, 'find').resolves(usersMock);

        const users = userModel.find();

        return expect(users).to.eventually.be.deep.equal(usersMock);
      });
    });

    describe('Model rejects', () => {
      it('Should throw a Mongoose Error', async () => {
        sinon.stub(Model, 'find').rejects(mongooseError)

        const user = userModel.find()

         return expect(user).to.eventually.be.rejectedWith(MONGOOSE_ERROR_MESSAGE);        
      });
    });
  });

  describe('findById', () => {
    describe('Success', () => {
      it('Should return an User', async () => {
        sinon.stub(Model, 'findById').resolves(userMock);

        const users = userModel.findById(userUUID);

        return expect(users).to.eventually.be.deep.equal(userMock);
      });
    });

    describe('Model rejects', () => {
      it('Should throw a Mongoose Error', async () => {
        sinon.stub(Model, 'findById').rejects(mongooseError)

        const user = userModel.findById(userUUID);

        return expect(user).to.eventually.be.rejectedWith(MONGOOSE_ERROR_MESSAGE); 
      });

    });
    describe('Invalid mongoId', () => {
      it('Should throw an InvalidMongoId Error if no uuid is passed', async () => {
        const user = userModel.findById();

        return expect(user).to.eventually.be.rejectedWith(ErrorTypes.INVALID_MONGO_ID);
      });

      it('Should throw an InvalidMongoId Error if uuid is not a string', async () => {
        const user = userModel.findById([]);

        return expect(user).to.eventually.be.rejectedWith(ErrorTypes.INVALID_MONGO_ID);
      });

      it('Should throw an InvalidMongoId Error if uuid is not valid', async () => {        
        const user = userModel.findById('not_valid_uuid');

        return expect(user).to.eventually.be.rejectedWith(ErrorTypes.INVALID_MONGO_ID);
      });
    });
  });

  describe('findOne', () => {
    describe('Success', () => {
      it('Should return an User', async () => {
        sinon.stub(Model, 'findOne').resolves(userMock);

        const users = userModel.findOne();

        return expect(users).to.eventually.be.deep.equal(userMock);
      });
    });

    describe('Model Rejects', () => {
      it('Should throw an Mongoose Error', async () => {
        sinon.stub(Model, 'findOne').rejects(mongooseError)

        const user = userModel.findOne(userUUID);

        return expect(user).to.eventually.be.rejectedWith(MONGOOSE_ERROR_MESSAGE); 
      });
    });
  });

  describe('update', () => {
    describe('Success', () => {
      it('Should return an User', async () => {
        sinon.stub(Model, 'findByIdAndUpdate').resolves(userMock);

        const users = userModel.update(userUUID);

        return expect(users).to.eventually.be.deep.equal(userMock);
      });
    });

    describe('Fail', () => {
      describe('Model rejects', () => {
        it('Should throw an Mongoose Error', async () => {
          sinon.stub(Model, 'findByIdAndUpdate').rejects(mongooseError)
  
          const user = userModel.update(userUUID);
  
          return expect(user).to.eventually.be.rejectedWith(MONGOOSE_ERROR_MESSAGE); 
        });
      });
      describe('Invalid mongoId', () => {
        it('Should throw an InvalidMongoId Error if no uuid is passed', async () => {
          const user = userModel.update();
  
          return expect(user).to.eventually.be.rejectedWith(ErrorTypes.INVALID_MONGO_ID);
        });
  
        it('Should throw an InvalidMongoId Error if uuid is not a string', async () => {
          const user = userModel.update([]);
  
          return expect(user).to.eventually.be.rejectedWith(ErrorTypes.INVALID_MONGO_ID);
        });
  
        it('Should throw an InvalidMongoId Error if uuid is not valid', async () => {        
          const user = userModel.update('not_valid_uuid');
  
          return expect(user).to.eventually.be.rejectedWith(ErrorTypes.INVALID_MONGO_ID);
        });
      });
    });
  });
  
  describe('delete', () => {
    describe('Success', () => {
      it('Should return true if the ENTITY is deleted', async () => {
        sinon.stub(Model, 'deleteOne').resolves(true);

        const user = userModel.delete(EMAIL);

        return expect(user).to.eventually.be.deep.equal(true);
      });
    });

    describe('Model rejects', () => {
      it('Should throw a Mongoose Error', async () => {
        sinon.stub(Model, 'deleteOne').rejects(mongooseError)

        const user = userModel.delete(EMAIL);

        return expect(user).to.eventually.be.rejectedWith(MONGOOSE_ERROR_MESSAGE); 
      });
    });
  });

  describe('signIn', () => {
    describe('Success', () => {
      it('Should return an User', async () => {
        sinon.stub(Model, 'findOne').resolves(userMock);

        const user = userModel.signIn(EMAIL);

        return expect(user).to.eventually.be.deep.equal(userMock);
      });
    });

    describe('Model rejects', () => {
      it('Should throw a Mongoose Error', async () => {
        sinon.stub(Model, 'findOne').rejects(mongooseError)

        const user = userModel.signIn(EMAIL);

        return expect(user).to.eventually.be.rejectedWith(MONGOOSE_ERROR_MESSAGE); 
      });
    });

    describe('Email not found', () => {
      it('Should throw an EmailAlreadyRegistered Error', async () => {
        sinon.stub(Model, 'findOne').resolves(undefined);
        const user = userModel.signIn(EMAIL);

        return expect(user).to.eventually.be.rejectedWith(ErrorTypes.UnauthorizedError); 
      });
    });
  });

  describe('checkIfEmailExists', () => {
    describe('Success', () => {
      it('Should return undefined', async () => {
        sinon.stub(Model, 'findOne').resolves(false);

        const user = userModel.checkIfEmailExists(EMAIL);

        return expect(user).to.eventually.be.deep.equal(undefined);
      });
    });

    describe('Model rejects', () => {
      it('Should throw a Mongoose Error', async () => {
        sinon.stub(Model, 'findOne').rejects(mongooseError)

        const user = userModel.checkIfEmailExists(EMAIL);

        return expect(user).to.eventually.be.rejectedWith(MONGOOSE_ERROR_MESSAGE); 
      });
    });

    describe('Email not found', () => {
      it('Should throw an EmailAlreadyRegistered Error', async () => {
        sinon.stub(Model, 'findOne').resolves(true);
        const user = userModel.checkIfEmailExists(EMAIL);

        return expect(user).to.eventually.be.rejectedWith(ErrorTypes.EmailAlreadyRegistered); 
      });
    });
  });
});