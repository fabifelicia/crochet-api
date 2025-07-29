import { DataTypes, Model } from "sequelize";
import sequelize from "../database/sequelize";

export default class Product extends Model {
  public id!: number;
  public name!: string;
  public tex!: number;
  public brand!: string;
public createdAt!: Date;
  
}

Product.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tex: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
},
{
    sequelize,
    tableName: "products",
    timestamps: true,
});
