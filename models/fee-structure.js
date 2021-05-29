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
      models.FeeStructure.belongsTo(models.Fee, { 
        foriegnKey: 'feeId',
        as: 'fee'
      });
      models.FeeStructure.belongsTo(models.Standard, { 
        foriegnKey: 'standardId',
        as: 'standard'
      });
    }
  };
  FeeStructure.init({
    year: DataTypes.STRING,
    standardId: DataTypes.INTEGER,
    feeId: DataTypes.INTEGER,
    frequency: DataTypes.ENUM("MONTHLY","BIMESTERLY","QUARTERLY","QUADRIMESTERLY","HALF-YEARLY","YEARLY"),
    amount: DataTypes.FLOAT,
    required: DataTypes.ENUM("OPTIONAL","REQUIRED"),
    isactive: {
      type: DataTypes.ENUM("INACTIVE","ACTIVE"),
      defaultValue: "ACTIVE"
    },
  }, {
    sequelize,
    modelName: 'FeeStructure',
  });
  return FeeStructure;
};