import DATABASE from "../../Database";
import { DataTypes, Model } from "sequelize";
import { Categories } from "./Categories";

const Products = DATABASE.define(
  "products",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    url_image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.JSON,
      allowNull: false
    },
    differences: {
      type: DataTypes.JSON,
      allowNull: false
    },
    note_client: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    apper_start: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    hero_product: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: Categories,
        key: "id"
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    }, 
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    modelName: "products",
    timestamps: true,
    underscored: false
  }
)

Categories.hasMany(Products)
Products.belongsTo(Categories, { foreignKey: "categoryId" })

export { Products }
