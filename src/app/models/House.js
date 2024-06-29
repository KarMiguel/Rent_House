import Sequelize , { Model } from 'sequelize';

class House extends Model {
  static init(sequelize) {
    return super.init(
      {
        thumbnail: {
          type: Sequelize.STRING,
        },
        description: {
          type: Sequelize.STRING,
        },
        price: {
          type: Sequelize.FLOAT,
        },
        location: {
          type: Sequelize.STRING,
        },
        status: {
          type: Sequelize.BOOLEAN,
        },
        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id',
          },
        },
      },
      {
        sequelize,
        modelName: 'House',
        tableName: 'houses',
        toJSON: {
          virtuals: true,
        },
      }
    );
  }

  toJSON() {
    const values = { ...this.get() };
    values.thumbnail_url = `http://localhost:3333/files/${values.thumbnail}`;
    return values;
  }
}

export default House;
