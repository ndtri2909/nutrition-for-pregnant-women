"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Phan_Loai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Phan_Loai.hasMany(models.Thuc_Don, {
            foreignKey: "PHANLOAI_ID",
          });
        Phan_Loai.hasMany(models.KetLuan_KhuyenNghi, {
            foreignKey: "PHANLOAI_ID",
          });
        Phan_Loai.hasMany(models.Bmi, {
            foreignKey: "PHANLOAI_ID",
          });
    }
  }
  Phan_Loai.init(
    {
      TEN: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      MOTA: {
        type: DataTypes.TEXT,
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
      modelName: "Phan_Loai",
      createdAt: "CREATED_DATE",
      updatedAt: "MODIFIED_DATE",
    }
  );
  return Phan_Loai;
};
