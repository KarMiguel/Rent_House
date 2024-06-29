import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import House from '../app/models/House';
import User from '../app/models/User';
import Reserve from '../app/models/Reserve';

const models = [House, User, Reserve];


class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();

