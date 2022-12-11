//@ts-nocheck

import * as sinon from 'sinon';
import { expect } from 'chai';
import { usersMock } from '../mocks/userMocks';
import User from '../../src/models/UserModel';
import { afterEach, before } from 'mocha';
import { expect, use } from 'chai';
import BcryptProvider from '../../src/Providers/BcryptProvider';
import LoginController from '../../src/controllers/LoginController';
import IZodSignUpValidator from '../../src/Validators/IZodSignUpValidator';
import IZodSignInValidator from '../../src/Validators/IZodSignInValidator';
import JwtProvider from '../../src/Providers/JwtProvider';
import LoginService from '../../src/Services/LoginService';
import { FAKE_TOKEN } from '../utils';


const chaiAsPromised = require('chai-as-promised');

use(chaiAsPromised);

describe('User Controller', () => {
  const userModel = new User();
  const bcryptProvider = new BcryptProvider();
  const jwtProvider = new JwtProvider();
  const loginService = new LoginService(
    userModel,
    bcryptProvider, 
    jwtProvider,
  );
  const signUpValidator = new IZodSignUpValidator();
  const signInValidator = new IZodSignInValidator();
  
  const loginController = new LoginController(loginService, signUpValidator, signInValidator);

  const req = {} as Request;
  const res = {} as Response;

  before(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    res.send = sinon.stub().returns(res);
  });

  afterEach(sinon.restore);

  describe('signUp', () => {
    describe('Success', () => {
      it('Should return a Token and status 200', async () => {
        sinon.stub(signUpValidator, 'validateBody').resolves(usersMock);
        sinon.stub(loginService, 'signUp').resolves(FAKE_TOKEN)

        await loginController.signUp(req, res);

        const statusStub = res.status as sinon.SinonStub;
        const jsonStub = res.json as sinon.SinonStub;
  
        expect(statusStub.calledWith(200)).to.be.true;
        expect(jsonStub.calledWith({token: FAKE_TOKEN})).to.be.true;
      });
    });

    describe('Validator Rejects', () => {
      it('Shoud be rejected', async () => {
        sinon.stub(signUpValidator, 'validateBody').rejects();
        sinon.stub(loginService, 'signUp').resolves(FAKE_TOKEN);

        const response = loginController.signUp(req, res);

        return expect(response).to.eventually.be.rejected;
      });
    });

    describe('Model Rejects', () => {
      it('Shoud be rejected', async () => {
        sinon.stub(signUpValidator, 'validateBody').resolves(usersMock);
        sinon.stub(loginService, 'signUp').rejects();

        const response = loginController.signUp(req, res);

        return expect(response).to.eventually.be.rejected;
      });
    });
  });

  describe('signIn', () => {
    describe('Success', () => {
      it('Should return a Token and status 200', async () => {
        sinon.stub(signInValidator, 'validateBody').resolves(usersMock);
        sinon.stub(loginService, 'signIn').resolves(FAKE_TOKEN)

        await loginController.signIn(req, res);

        const statusStub = res.status as sinon.SinonStub;
        const jsonStub = res.json as sinon.SinonStub;
  
        expect(statusStub.calledWith(200)).to.be.true;
        expect(jsonStub.calledWith({token: FAKE_TOKEN})).to.be.true;
      });
    });

    describe('Validator Rejects', () => {
      it('Shoud be rejected', async () => {
        sinon.stub(signInValidator, 'validateBody').rejects(usersMock);
        sinon.stub(loginService, 'signIn').resolves(FAKE_TOKEN)

        const response = loginController.signIn(req, res);

        return expect(response).to.eventually.be.rejected;
      });
    });

    describe('Model Rejects', () => {
      it('Shoud be rejected', async () => {
        sinon.stub(signInValidator, 'validateBody').resolves(usersMock);
        sinon.stub(loginService, 'signIn').rejects()

        const response = loginController.signIn(req, res);

        return expect(response).to.eventually.be.rejected;
      });
    });
  });
});