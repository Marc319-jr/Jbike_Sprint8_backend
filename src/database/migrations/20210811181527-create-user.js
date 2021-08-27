'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      addressId: {
        type: Sequelize.INTEGER,
        references:
        {
          model: "addresses",
          key: "id"
        }
        

      },

      image: {
        type: Sequelize.STRING
      },

      rolId: {
        type: Sequelize.INTEGER,
        references:
        {
          model: "rols",
          key: "id"
        }
        
      },
      genreId: {
        type: Sequelize.INTEGER,
        references:
        {
          model: "genres",
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
    await queryInterface.dropTable('Users');
  }
};