'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //belongsToMany
      Category.belongsToMany(models.Product , {
        as: "categoryByProducts",
        through: "categoryproducts",
        foreignKey: "categoryId",
        otherKey: "productdId"
      });
    }
  };
  Category.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};