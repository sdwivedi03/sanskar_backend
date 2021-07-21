'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    
    static associate(models) {
      // define association here
    }
  };
  Address.init({
    studentId: DataTypes.INTEGER,
    village: DataTypes.STRING,
    post: DataTypes.STRING,
    district: DataTypes.STRING,
    state: DataTypes.STRING,
    pin: DataTypes.INTEGER,
    addressType: DataTypes.ENUM("LOCAL","PERMANENT","BOTH")
  }, {
    sequelize,
    modelName: 'Address',
    unique: ['studentId', 'addressType']
  });
  return Address;
};