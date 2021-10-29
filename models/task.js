'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'title must not be empty',
        },
      }
    },
    categoryId: DataTypes.INTEGER,
    description: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: 'description must not be empty',
        },
        len: {
          args: [0, 300],
          msg: 'description must not be more than 300 characters long',
        }
      }
    },
    completed: DataTypes.BOOLEAN,
  }, {});
  Task.associate = function(models) {
    Task.belongsTo(models.Category, { foreignKey: 'categoryId' });
  };
  return Task;
};