import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/sequelize';

export default class Product extends Model {
  public id!: number;
  public name!: string;
  public tex!: number;
  public brand!: string;
}

Product.init(
  {
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
  },
  {
    sequelize,
    tableName: 'products',
    timestamps: false,
  }
);
