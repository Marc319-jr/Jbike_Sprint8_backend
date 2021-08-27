'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // hasmany
      Address.hasMany(models.User ,{
        foreignKey: "addressId",
        as: "users"
      });
    }
  };
  Address.init({
    street: DataTypes.STRING,
    number: DataTypes.INTEGER,
    apt: DataTypes.INTEGER,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    zipcode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};