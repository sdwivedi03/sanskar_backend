'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FeeStructure extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  FeeStructure.init({
    year: DataTypes.STRING,
    classId: DataTypes.INTEGER,
    feeName: DataTypes.INTEGER,
    frequency: DataTypes.ENUM("MONTHLY","BIMESTERLY","QUARTERLY","QUADRIMESTERLY","HALF-YEARLY","YEARLY"),
    amount: DataTypes.FLOAT,
    required: DataTypes.ENUM("OPTIONAL","REQUIRED"),
    isactive: DataTypes.ENUM("INACTIVE","ACTIVE")
  }, {
    sequelize,
    modelName: 'FeeStructure',
  });
  return FeeStructure;
};