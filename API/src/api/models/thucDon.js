"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Thuc_Don extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Thuc_Don.belongsTo(models.Phan_Loai, {
            foreignKey: "PHANLOAI_ID",
          });
        Thuc_Don.hasMany(models.Setting_ThucDon, {
            foreignKey: "THUCDON_ID",
          });
    }
  }
  Thuc_Don.init(
    {
      KHOANG: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      THU: {
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
      modelName: "Thuc_Don",
      createdAt: "CREATED_DATE",
      updatedAt: "MODIFIED_DATE",
    }
  );
  return Thuc_Don;
};
