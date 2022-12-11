import { Router } from 'express';
import { userController } from '../factories';

const route = Router();

route.get('/:id', (req, res) => userController.getById(req, res));
route.get('/', (req, res) => userController.getAll(req, res));
route.put('/:id', (req, res) => userController.update(req, res));
route.delete('/me', (req, res) => userController.delete(req, res));

export default route;