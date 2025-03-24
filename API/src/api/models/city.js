"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Cities.hasMany(models.Districts, {
            foreignKey: "CITY_ID",
          });
        Cities.hasMany(models.Users, {
            foreignKey: "CITY_ID",
          });
    }
  }
  Cities.init(
    {
      NAME: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      DESC: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      CD: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      NOTE: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      COUNTRY_ID: {
        type: DataTypes.INTEGER,
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
      modelName: "Cities",
      createdAt: "CREATED_DATE",
      updatedAt: "MODIFIED_DATE",
    }
  );
  return Cities;
};
