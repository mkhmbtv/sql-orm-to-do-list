'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    content: DataTypes.STRING
  }, {});
  Note.associate = function(models) {
    // associations can be defined here
  };
  return Note;
};