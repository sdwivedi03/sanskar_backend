'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Standard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Standard.init({
    name: DataTypes.STRING,
    isactive: DataTypes.ENUM("INACTIVE","ACTIVE")
  }, {
    sequelize,
    modelName: 'Standard',
  });
  return Standard;
};