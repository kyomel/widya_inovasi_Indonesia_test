'use strict';
const bcrypt = require('bcrypt');

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
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: "Please use another email"
      },
      validate: {
        notEmpty: {
          msg: "Email field still empty"
        },
        isEmail: {
          msg: "Please input email format"
        }
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Please Input Password"
        }
      }
    },
    name: DataTypes.STRING,
    jenis_kelamin: DataTypes.STRING
  }, {
    hooks: {
      beforeValidate: instance => {
        instance.email = instance.email.toLowerCase();
      },
      beforeCreate: instance => {
        instance.password = bcrypt.hashSync(instance.password, 10)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};