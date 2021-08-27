'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Size extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //belongsToMany
      Size.belongsToMany(models.Product , {
        as: "productBySize",
        through: "sizeproducts"
      });

    }
  };
  Size.init({
    name: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Size',
  });
  return Size;
};