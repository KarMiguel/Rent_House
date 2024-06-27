import { Router } from 'express';
import { specs, swaggerUi } from './config/swaggerConfig';
import multer from 'multer';
import uploadConfig from './config/uploadConfig';


import SessionController from './controllers/SessionController';
import HouseController from './controllers/HouseController';
import DashboardController from './controllers/DashboardController';
import ReserveController from './controllers/ReserveController';



const routes = new Router();
const upload = multer(uploadConfig);

routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(specs));

routes.post('/sessions', SessionController.store);

routes.post('/houses', upload.single('thumbnail'), HouseController.store);
routes.get('/houses',HouseController.index);
routes.put('/houses/:house_id',upload.single('thumbnail'), HouseController.store)
routes.delete('/houses', HouseController.destroy);

routes.get('/dashboard', DashboardController.show);

routes.post('/houses/:house_id/reserve', ReserveController.store);
routes.get('/reserves', ReserveController.index);
routes.delete('/reserves/cancel', ReserveController.destroy);


export default routes;
