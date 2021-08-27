'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //belongsTo
      User.belongsTo(models.Rol , {
        foreignKey: 'rolId',
        as: "rol"
      });
      User.belongsTo(models.Address ,{
        foreignKey: 'addressId',
        as: "address"
      });
      User.belongsTo(models.Genre, {
        foreignKey: "genreId",
        as: "genre"
      });





      // hasMany
      User.hasMany(models.Order , {
        foreignKey: "userId",
        as: "orders"
      })
      
    }
  };
  User.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    addressId: DataTypes.INTEGER,
    image: DataTypes.STRING,
    rolId: DataTypes.INTEGER,
    genreId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};