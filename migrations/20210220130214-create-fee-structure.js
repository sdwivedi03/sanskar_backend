'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('fees_tructures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      year: {
        type: Sequelize.STRING
      },
      classId: {
        type: Sequelize.INTEGER
      },
      feeName: {
        type: Sequelize.INTEGER
      },
      frequency: {
        type: Sequelize.ENUM("MONTHLY","BIMESTERLY","QUATERLY","QUADRIMESTERLY","HALF-YEARY","YEARLY")
      },
      amount: {
        type: Sequelize.FLOAT
      },
      required: {
        type: Sequelize.ENUM("OPTIONAL","REQUIRED")
      },
      isactive: {
        type: Sequelize.ENUM("INACTIVE","ACTIVE")
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('fee_structures');
  }
};