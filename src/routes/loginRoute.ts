import { Router } from 'express';
import { loginController } from '../factories';

const route = Router();

route.post('/signUp', (req, res) => loginController.signUp(req, res));
route.post('/signIn', (req, res) => loginController.signIn(req, res));

export default route;