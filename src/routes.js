import {Router} from 'express';
import SessionController from './controllers/SessionController';
import HouseController from './controllers/HouseController';

const routes = new Router()

routes.post('/sessions',SessionController.store);
routes.post('/houses',HouseController.store);


export default  routes;