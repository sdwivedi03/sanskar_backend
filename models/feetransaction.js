'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fee_transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  fee_transaction.init({
    studentId: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    year: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FeeTransaction',
  });
  return fee_transaction;
};