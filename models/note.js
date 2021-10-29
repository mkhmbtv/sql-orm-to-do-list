'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    content: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'content must not be empty',
        },
        len: {
          args: [0, 300],
          msg: 'content must not be more than 300 characters long',
        },
      }
    },
    completed: DataTypes.BOOLEAN,
  }, {});
  Note.associate = function(models) {
    // associations can be defined here
  };
  return Note;
};