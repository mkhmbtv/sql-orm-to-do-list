'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'name must not be null',
        },
        notEmpty: {
          msg: 'name must not be empty',
        },
        len: {
          args: [0, 30],
          msg: 'name must not be more than 30 characters long',
        },
      }
    },
  }, {});
  Category.associate = function(models) {
    Category.hasMany(models.Task, { foreignKey: 'categoryId' });
  };
  return Category;
};