'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //belongsTO
      Order.belongsTo(models.User);
     
      

      //belongsToMany
      Order.belongsToMany(models.Product , {
        as: "orders",
        through: "orderproducts"
      });

      //has Many
      Order.hasMany(models.OrderProduct , {
        foreignKey: "orderId",
        as: "orderproducts"
      })


      
    }
  };
  Order.init({
    status: DataTypes.STRING,
    payment: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};