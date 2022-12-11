//@ts-nocheck

import * as sinon from 'sinon';
import { expect } from 'chai';
import { EMAIL, userMock, usersMock, userUUID } from '../mocks/userMocks';
import User from '../../src/models/UserModel';
import { afterEach, before } from 'mocha';
import { expect, use } from 'chai';
import UserService from '../../src/Services/UserService';
import BcryptProvider from '../../src/Providers/BcryptProvider';
import IZodUserUpdateValidator from '../../src/Validators/IZodUserUpdateValidator';
import UserController from '../../src/controllers/UserController';


const chaiAsPromised = require('chai-as-promised');

use(chaiAsPromised);

describe('User Controller', () => {
  const userModel = new User();
  const validator = new IZodUserUpdateValidator();
  const bcryptProvider = new BcryptProvider();
  const userService = new UserService(userModel, bcryptProvider);

  const userController = new UserController(userService, validator);

  const req = {} as Request;
  const res = {} as Response;

  before(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    res.send = sinon.stub().returns(res);
  });

  afterEach(sinon.restore);

  describe('getAll', () => {
    describe('Success', () => {
      it('Should return a list of Users and status 200', async () => {
        sinon.stub(userService, 'getAll').resolves(usersMock);

        await userController.getAll(req, res);

        const statusStub = res.status as sinon.SinonStub;
        const jsonStub = res.json as sinon.SinonStub;
  
        expect(statusStub.calledWith(200)).to.be.true;
        expect(jsonStub.calledWith(usersMock)).to.be.true;
      });
    });

    describe('Model Rejects', () => {
      it('Shoud be rejected', async () => {
        sinon.stub(userService, 'getAll').rejects();

        const response = userController.getAll(req, res);

        return expect(response).to.eventually.be.rejected;
      });
    });
  });

  describe('getById', () => {
    describe('Success', () => {
      it('Should return an  User and status 200', async () => {
        req.params = {id: userUUID}
        sinon.stub(userService, 'getById').resolves(userMock);

        await userController.getById(req, res);

        const statusStub = res.status as sinon.SinonStub;
        const jsonStub = res.json as sinon.SinonStub;
  
        expect(statusStub.calledWith(200)).to.be.true;
        expect(jsonStub.calledWith(userMock)).to.be.true;
      });
    });

    describe('Model Rejects', () => {
      it('Shoud be rejected', async () => {
        req.params = {id: userUUID}
        sinon.stub(userService, 'getById').rejects();

        const response = userController.getById(req, res);

        return expect(response).to.eventually.be.rejected;
      });
    });
  });

  describe('update', () => {
    describe('Success', () => {
      it('Should return an  UpdatedUser and status 200', async () => {
        sinon.stub(validator, 'validateBody').resolves(userMock);
        sinon.stub(userService, 'update').resolves(userMock);
        
        req.params = {id: userUUID};
        await userController.update(req, res);

        const statusStub = res.status as sinon.SinonStub;
        const jsonStub = res.json as sinon.SinonStub;
  
        expect(statusStub.calledWith(200)).to.be.true;
        expect(jsonStub.calledWith(userMock)).to.be.true;
      });
    });

    describe('validator Rejects', () => {
      it('Shoud be rejected', async () => {
        req.params = {id: userUUID}
        sinon.stub(validator, 'validateBody').rejects();
        sinon.stub(userService, 'update').resolves();

        const response = userController.update(req, res);

        return expect(response).to.eventually.be.rejected;
      });
    });

    describe('validator returns empty', () => {
      it('Shoud be rejected', async () => {
        req.params = {id: userUUID}
        sinon.stub(validator, 'validateBody').resolves(false);
        sinon.stub(userService, 'getById').resolves();

        await userController.update(req, res);

        const statusStub = res.status as sinon.SinonStub;

        expect(statusStub.calledWith(304)).to.be.true;
      });
    });

    describe('UserService update rejects', () => {
      it('Shoud be rejected', async () => {
        req.params = {id: userUUID}
        sinon.stub(validator, 'validateBody').resolves(true);
        sinon.stub(userService, 'update').rejects();


        const response = userController.update(req, res);

        return expect(response).to.eventually.be.rejected;
      });
    });
  });

  describe('delete', () => {
    describe('Success', () => {
      it('Should return 204 no content', async () => {
        sinon.stub(userService, 'delete').resolves();
        req.headers = {user:{EMAIL}};

        await userController.delete(req, res);

        const statusStub = res.status as sinon.SinonStub;
  
        expect(statusStub.calledWith(204)).to.be.true;
      });
    });

    describe('Model Rejects', () => {
      it('Should be rejected', async () => {
        sinon.stub(userService, 'delete').rejects();
        req.headers = {user:{EMAIL}};

        const response =  userController.delete(req, res);

        return expect(response).to.eventually.be.rejected;
      });
    });
  });
});