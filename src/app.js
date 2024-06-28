import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import routes from './routes';
import path from 'path';
import cors from 'cors';


class App {

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();

    mongoose.connect('mongodb+srv://karMiguel:adminpass@cluster0.dcsjhhz.mongodb.net/yourDatabaseName?retryWrites=true&w=majority&appName=Cluster0', {
    }).then(() => {
      console.log('Database connection successful');
    }).catch((err) => {
      console.error('Database connection error:', err);
    });
  }

  middlewares() {

    this.server.use(cors())

    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'uploads'))
    );
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
