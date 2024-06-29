import { Router } from 'express';
import { specs, swaggerUi } from './config/swaggerConfig';
import multer from 'multer';
import uploadConfig from './config/uploadConfig';

import UserController from './app/controllers/UserController';
import HouseController from './app/controllers/HouseController';
import DashboardController from './app/controllers/DashboardController';
import ReserveController from './app/controllers/ReserveController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth'

const routes = new Router();
const upload = multer(uploadConfig);

routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(specs));

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.post('/sessions/forgot_password', SessionController.forgotPassword);
routes.post('/sessions/reset_password', SessionController.resetPassword);

routes.use(authMiddleware);


routes.post('/houses', upload.single('thumbnail'), HouseController.store);
routes.get('/houses',HouseController.index);
routes.put('/houses/:house_id', upload.single('thumbnail'), HouseController.update);
routes.delete('/houses', HouseController.destroy);

routes.get('/dashboard', DashboardController.show);

routes.post('/houses/:house_id/reserve', ReserveController.store);
routes.get('/reserves', ReserveController.index);
routes.delete('/reserves/cancel', ReserveController.destroy);


export default routes;
