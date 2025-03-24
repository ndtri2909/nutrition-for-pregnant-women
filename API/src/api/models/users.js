"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Users.belongsTo(models.Cities, {
            foreignKey: "CITY_ID",
          });
        Users.hasMany(models.Bmi, {
            foreignKey: "USER_ID",
          });
    }
  }
  Users.init(
    {
      EMAIL: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      PASSWORD: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      FULLNAME: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      PHONE: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      DOB: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      IS_ADMIN:{
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      CREATED_DATE: DataTypes.DATE,
      CREATED_BY: DataTypes.INTEGER,
      MODIFIED_DATE: DataTypes.DATE,
      MODIFIED_BY: DataTypes.INTEGER,
      IS_DELETED: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Users",
      createdAt: "CREATED_DATE",
      updatedAt: "MODIFIED_DATE",
    }
  );
  return Users;
};
