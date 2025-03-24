"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Dinh_Duong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Dinh_Duong.belongsTo(models.Mon_An, {
            foreignKey: "MONAN_ID",
          });
    }
  }
  Dinh_Duong.init(
    {
      TEN: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      GIATRI: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      DONVI: {
        type: DataTypes.STRING,
        allowNull: true,
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
      modelName: "Dinh_Duong",
      createdAt: "CREATED_DATE",
      updatedAt: "MODIFIED_DATE",
    }
  );
  return Dinh_Duong;
};
