"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Setting_ThucDon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

        Setting_ThucDon.belongsTo(models.Thuc_Don, {
            foreignKey: "THUCDON_ID",
          });
        Setting_ThucDon.belongsTo(models.Mon_An, {
            foreignKey: "MONAN_ID",
          });
    }
  }
  Setting_ThucDon.init(
    {
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
      modelName: "Setting_ThucDon",
      createdAt: "CREATED_DATE",
      updatedAt: "MODIFIED_DATE",
    }
  );
  return Setting_ThucDon;
};
