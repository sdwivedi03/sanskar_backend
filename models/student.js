'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Student.hasOne(models.Parents,{
        foreignKey: 'studentId',
        as: 'parents'
      });

      models.Student.hasMany(models.Address,{
        foreignKey: 'studentId',
        as: 'address'
      });

      models.Student.belongsTo(models.Standard,{
        foreignKey: 'standardId',
        as: 'standard'
      });

      models.Student.hasMany(models.FeeStructure, {
        foreignKey: 'standardId',
        as: 'feeStructures'
      });

      models.Student.hasMany(models.FeeTransaction, {
        foreignKey: 'studentId',
        as: 'submitedFees'
      });
    }
  };
  Student.init({
    name: DataTypes.STRING,
    standardId: DataTypes.INTEGER,
    gender: DataTypes.ENUM("MALE","FEMALE"),
    healthStatus: DataTypes.STRING,
    image: {
      type: DataTypes.TEXT('long'),
    }, 
    nationality: DataTypes.STRING,
    place: DataTypes.STRING,
    dateOfBirth: DataTypes.DATEONLY,
    convenience: DataTypes.ENUM("YES","NO"),
    bloodGroup: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};