"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class KetLuan_KhuyenNghi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        KetLuan_KhuyenNghi.belongsTo(models.Phan_Loai, {
            foreignKey: "PHANLOAI_ID",
          });
        KetLuan_KhuyenNghi.hasMany(models.Bmi, {
            foreignKey: "KETLUANKHUYENNGHI_ID",
          });
    }
  }
  KetLuan_KhuyenNghi.init(
    {
      TYPE:{
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      KHOANG: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      NHONHAT: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      LONNHAT: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      SOSANH:{
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      KETLUAN: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      KHUYENNGHI: {
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
      modelName: "KetLuan_KhuyenNghi",
      createdAt: "CREATED_DATE",
      updatedAt: "MODIFIED_DATE",
    }
  );
  return KetLuan_KhuyenNghi;
};
