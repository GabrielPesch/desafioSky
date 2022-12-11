//@ts-nocheck

import * as sinon from 'sinon';
import { expect } from 'chai';
import { Model } from 'mongoose';
import { EMAIL, userMock, usersMock, userUUID } from '../mocks/userMocks';
import User from '../../src/models/UserModel';
import { afterEach } from 'mocha';
import { ErrorTypes } from '../../src/errors/errorCatalog';
import { expect, use } from 'chai';
import UserService from '../../src/Services/UserService';
import BcryptProvider from '../../src/Providers/BcryptProvider';


const chaiAsPromised = require('chai-as-promised');

use(chaiAsPromised);

describe('User Service', () => {
  const userModel = new User();
  const bcryptProvider = new BcryptProvider();
  const userService = new UserService(userModel, bcryptProvider);
  
  afterEach(sinon.restore);

  describe('getAll', () => {
    describe('Success', () => {
      it('Should return a list of Users', async () => {
        sinon.stub(userModel, 'find').resolves(usersMock);

        const users = userService.getAll();
  
        return expect(users).to.eventually.be.deep.equal(usersMock);
      });
    });

    describe('Model Rejects', () => {
      it('Should be rejected', async () => {
        sinon.stub(Model, 'find').rejects();

        const users = userService.getAll();
  
        return expect(users).to.eventually.be.rejected;
      });
    });
  });

  describe('getById', () => {
    describe('Success', () => {
      it('Should return an User', async () => {
        sinon.stub(userModel, 'findById').resolves(userMock);

        const users = userService.getById(userUUID);
  
        return expect(users).to.eventually.be.deep.equal(userMock);
      });
    });

    describe('Model Rejects', () => {
      it('Should be rejected', async () => {
        sinon.stub(userModel, 'findById').rejects();

        const users = userService.getById(userUUID);
  
        return expect(users).to.eventually.be.rejected;
      });
    });

    describe('Model dosent find an Entity', () => {
      it('Should be rejected', async () => {
        sinon.stub(userModel, 'findById').resolves();

        const users = userService.getById(userUUID);
  
        return expect(users).to.eventually.be.rejectedWith(ErrorTypes.ObjectNotFound);
      });
    });
  });

  describe('Update', () => {
    describe('Success', () => {
      it('Should return an User', async () => {
        sinon.stub(userModel, 'update').resolves(userMock);
        sinon.stub(bcryptProvider, 'encrypt').resolves('hashed');

        const users = userService.update(userUUID, userMock);
  
        return expect(users).to.eventually.be.deep.equal(userMock);
      });
    });

    describe('Model Rejects', () => {
      it('Should be rejected', async () => {
        sinon.stub(userModel, 'update').rejects()
        sinon.stub(bcryptProvider, 'encrypt').resolves('hashed')

        const user = userService.update(userUUID, userMock)
  
        return expect(user).to.eventually.be.rejected;
      });
    });

    describe('Bcrypt Rejects', () => {
      it('Should be rejected', async () => {
        sinon.stub(userModel, 'update').resolves(userMock);
        sinon.stub(bcryptProvider, 'encrypt').rejects();

        const user = userService.update(userUUID, userMock);
  
        return expect(user).to.eventually.be.rejected;
      });
    });

    describe('Model returns empty', () => {
      it('Should be rejected', async () => {
        sinon.stub(userModel, 'update').resolves(false);
        sinon.stub(bcryptProvider, 'encrypt').resolves('hashed');

        const user = userService.update(userUUID, userMock);
  
        return expect(user).to.eventually.be.rejectedWith(ErrorTypes.ObjectNotFound);
      });
    });
  });

  describe('Delete', () => {
    describe('Success', () => {
      it('Should return undefined', async () => {
        sinon.stub(userModel, 'delete').resolves(true);

        const result = userService.delete(EMAIL);
  
        return expect(result).to.eventually.be.deep.undefined;
      });
    });

    describe('Model Rejects', () => {
      it('Should be rejected', async () => {
        sinon.stub(userModel, 'delete').rejects();

        const users = userService.delete();
  
        return expect(users).to.eventually.be.rejected;
      });
    });

    describe('User not deleted', () => {
      it('Should be rejected with Object Not Found Error', async () => {
        sinon.stub(userModel, 'delete').resolves(false);

        const users = userService.delete(EMAIL);
  
        return expect(users).to.eventually.be.rejectedWith(ErrorTypes.ObjectNotFound);
      });
    });
  });
});