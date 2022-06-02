'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Books.belongsTo(models.Author, {
        foreignKey: 'id',
        onDelete: 'CASCADE'
      })
    }
  }
  Books.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    date: DataTypes.STRING,
    edition: DataTypes.INTEGER,
    author_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Books',
  });
  return Books;
};