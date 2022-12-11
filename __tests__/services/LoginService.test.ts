//@ts-nocheck

import * as sinon from 'sinon';
import { expect } from 'chai';
import {  userMock } from '../mocks/userMocks';
import User from '../../src/models/UserModel';
import { afterEach } from 'mocha';
import { ErrorTypes } from '../../src/errors/errorCatalog';
import { expect, use } from 'chai';
import BcryptProvider from '../../src/Providers/BcryptProvider';
import JwtProvider from '../../src/Providers/JwtProvider';
import LoginService from '../../src/Services/LoginService';
import { FAKE_TOKEN, HASHED_PASSWORD } from '../utils';


const chaiAsPromised = require('chai-as-promised');

use(chaiAsPromised);

describe('Login Service', () => {
  const userModel = new User();
  const bcryptProvider = new BcryptProvider();
  const jwtProvider = new JwtProvider();
  const loginService = new LoginService(userModel, bcryptProvider, jwtProvider);
  
  afterEach(sinon.restore);

  describe('signUp', () => {
    describe('Success', () => {
      it('Should return a token', async () => {
        sinon.stub(userModel, 'checkIfEmailExists').resolves(true);
        sinon.stub(bcryptProvider, 'encrypt').resolves(HASHED_PASSWORD);
        sinon.stub(userModel, 'create').resolves(true);
        sinon.stub(jwtProvider, 'generate').resolves(FAKE_TOKEN);

        const result = loginService.signUp(userMock);
  
        return expect(result).to.eventually.be.deep.equal(FAKE_TOKEN);
      });
    });

    describe('Model.checkIfEmailExists Rejects', () => {
      it('Should be rejected', async () => {
        sinon.stub(userModel, 'checkIfEmailExists').rejects();
        sinon.stub(bcryptProvider, 'encrypt').resolves(HASHED_PASSWORD);
        sinon.stub(userModel, 'create').resolves(true);
        sinon.stub(jwtProvider, 'generate').resolves(FAKE_TOKEN);

        const result = loginService.signUp(userMock);
  
        return expect(result).to.eventually.be.deep.rejected;
      });
    });

    describe('Bcrypts Rejects', () => {
      it('Should be rejected', async () => {
        sinon.stub(userModel, 'checkIfEmailExists').resolves(true);
        sinon.stub(bcryptProvider, 'encrypt').rejects();
        sinon.stub(userModel, 'create').resolves(true);
        sinon.stub(jwtProvider, 'generate').resolves(FAKE_TOKEN);

        const result = loginService.signUp(userMock);
  
        return expect(result).to.eventually.be.deep.rejected;
      });
    });

    describe('Model.create Rejects', () => {
      it('Should be rejected', async () => {
        sinon.stub(userModel, 'checkIfEmailExists').resolves(true);
        sinon.stub(bcryptProvider, 'encrypt').resolves(HASHED_PASSWORD);
        sinon.stub(userModel, 'create').rejects();
        sinon.stub(jwtProvider, 'generate').resolves(FAKE_TOKEN);

        const result = loginService.signUp(userMock);
  
        return expect(result).to.eventually.be.deep.rejected;
      });
    });

    describe('JwtProvider rejects', () => {
      it('Should be rejected', async () => {
        sinon.stub(userModel, 'checkIfEmailExists').resolves(true);
        sinon.stub(bcryptProvider, 'encrypt').resolves(HASHED_PASSWORD);
        sinon.stub(userModel, 'create').resolves(true);
        sinon.stub(jwtProvider, 'generate').rejects();

        const result = loginService.signUp(userMock);
  
        return expect(result).to.eventually.be.deep.rejected;
      });
    });
  });

  describe('signIn', () => {
    describe('Success', () => {
      it('Should return a token', async () => {
        sinon.stub(userModel, 'findOne').resolves(userMock);
        sinon.stub(bcryptProvider, 'validate').resolves(true);
        sinon.stub(userModel, 'signIn').resolves(true);
        sinon.stub(jwtProvider, 'generate').resolves(FAKE_TOKEN);

        const result = loginService.signIn(userMock);
  
        return expect(result).to.eventually.be.deep.equal(FAKE_TOKEN);
      });
    });

    describe('Model.findOne Rejects', () => {
      it('Should be rejected', async () => {
        sinon.stub(userModel, 'findOne').rejects();
        sinon.stub(bcryptProvider, 'validate').resolves(true);
        sinon.stub(userModel, 'signIn').resolves(true);
        sinon.stub(jwtProvider, 'generate').resolves(FAKE_TOKEN);

        const result = loginService.signIn(userMock);
  
        return expect(result).to.eventually.be.rejected;
      });
    });

    describe('userModel.findOne returns empty', () => {
      it('Should be rejected with UnauthorizedError', async () => {
        sinon.stub(userModel, 'findOne').resolves(false);
        sinon.stub(bcryptProvider, 'validate').resolves(true);
        sinon.stub(userModel, 'signIn').resolves(true);
        sinon.stub(jwtProvider, 'generate').resolves();

        const result = loginService.signIn(userMock);
  
        return expect(result).to.eventually.be.rejectedWith(ErrorTypes.UnauthorizedError);
      });
    });

    describe('Bcrypt Rejects', () => {
      it('Should be rejected', async () => {
        sinon.stub(userModel, 'findOne').resolves(userMock);
        sinon.stub(bcryptProvider, 'validate').rejects();
        sinon.stub(userModel, 'signIn').resolves(true);
        sinon.stub(jwtProvider, 'generate').resolves(FAKE_TOKEN);

        const result = loginService.signIn(userMock);
  
        return expect(result).to.eventually.be.rejected;
      });
    });

    describe('Model.signIn Rejects', () => {
      it('Should be rejected', async () => {
        sinon.stub(userModel, 'findOne').resolves(userMock);
        sinon.stub(bcryptProvider, 'validate').resolves(true);
        sinon.stub(userModel, 'signIn').rejects();
        sinon.stub(jwtProvider, 'generate').resolves(FAKE_TOKEN);

        const result = loginService.signIn(userMock);
  
        return expect(result).to.eventually.be.rejected;
      });
    });

    describe('Jwt Rejects', () => {
      it('Should be rejected', async () => {
        sinon.stub(userModel, 'findOne').resolves(userMock);
        sinon.stub(bcryptProvider, 'validate').resolves(true);
        sinon.stub(userModel, 'signIn').resolves(true);
        sinon.stub(jwtProvider, 'generate').rejects();

        const result = loginService.signIn(userMock);
  
        return expect(result).to.eventually.be.rejected;
      });
    });
  });

});