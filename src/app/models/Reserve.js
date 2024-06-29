import User from './User';
import House from './House';
import Sequelize, { Model } from 'sequelize';

class Reserve extends Model {
  static init(sequelize) {
    return super.init(
      {
        date: {
          type: Sequelize.STRING,
        },
        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: User,
            key: 'id',
          },
        },
        houseId: {
          type: Sequelize.INTEGER,
          references: {
            model: House,
            key: 'id',
          },
        },
      },
      {
        sequelize,
        modelName: 'Reserve',
        tableName: 'reserves',
      }
    );
  }
}

export default Reserve;
