'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {});
  Task.associate = function(models) {
    // associations can be defined here
  };
  return Task;
};