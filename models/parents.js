'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Parents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Parents.init({
    studentId: DataTypes.INTEGER,
    fatherName: DataTypes.STRING,
    motherName: DataTypes.STRING,
    fatherOccupation: DataTypes.STRING,
    motherOccupation: DataTypes.STRING,
    contactNo: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Parents',
  });
  return Parents;
};