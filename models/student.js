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
    }
  };
  Student.init({
    name: DataTypes.STRING,
    standardId: DataTypes.INTEGER,
    gender: DataTypes.ENUM("MALE","FEMALE"),
    healthStatus: DataTypes.STRING,
    image: {
      type: DataTypes.TEXT('medium'),
    }, 
    nationality: DataTypes.STRING,
    place: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    convenience: DataTypes.ENUM("YES","NO"),
    bloodGroup: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};