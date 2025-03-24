"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Dinh_duong_khuyen_nghi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Dinh_duong_khuyen_nghi.hasMany(models.Chi_tiet_dinh_duong_khuyen_nghi, {
            foreignKey: "DINH_DUONG_KHUYEN_NGHI_ID",
          });
    }
  }
  Dinh_duong_khuyen_nghi.init(
    {
      TEN: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      TUAN: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      NGAY: {
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
      modelName: "Dinh_duong_khuyen_nghi",
      createdAt: "CREATED_DATE",
      updatedAt: "MODIFIED_DATE",
    }
  );
  return Dinh_duong_khuyen_nghi;
};
