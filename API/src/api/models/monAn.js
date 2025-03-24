"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Mon_An extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Mon_An.hasMany(models.Dinh_Duong, {
            foreignKey: "MONAN_ID",
          });
        Mon_An.hasMany(models.Image_Mon_An, {
            foreignKey: "MONAN_ID",
          });
        Mon_An.hasMany(models.Cong_Thuc, {
            foreignKey: "MONAN_ID",
          });
        Mon_An.hasMany(models.Setting_ThucDon, {
          foreignKey: "MONAN_ID",
        });
    }
  }
  Mon_An.init(
    {
      TEN: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      HINHANH: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      TYPE: {
        type: DataTypes.INTEGER,
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
      modelName: "Mon_An",
      createdAt: "CREATED_DATE",
      updatedAt: "MODIFIED_DATE",
    }
  );
  return Mon_An;
};
