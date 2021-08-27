'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      model: {
        type: Sequelize.STRING
      },
      desc1: {
        type: Sequelize.TEXT
      },
      desc2: {
        type: Sequelize.TEXT
      },
      image1: {
        type: Sequelize.STRING
      },
      image2: {
        type: Sequelize.STRING
      },
      image3: {
        type: Sequelize.STRING
      },
      image4: {
        type: Sequelize.STRING
      },
      keywords: {
        type: Sequelize.TEXT
      },
      stock: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.DECIMAL
      },
      discount: {
        type: Sequelize.INTEGER
      },
      cuotas: {
        type: Sequelize.INTEGER
      },
      activate: {
        type: Sequelize.INTEGER
      },
      brandId: {
        type: Sequelize.INTEGER,
        references:
        {
          model: "brands",
          key: "id"
        }
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
    await queryInterface.dropTable('Products');
  }
};