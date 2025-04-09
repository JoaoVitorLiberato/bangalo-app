import DATABASE from "../../Database";
import { DataTypes } from "sequelize"

const ORDER = DATABASE.define(
  "order",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    canal: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    consumidor: {
      type: DataTypes.JSON
    },
    produtos: DataTypes.JSON,
    pagamento: DataTypes.JSON,
    analytics: DataTypes.JSON,
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
    modelName: "order",
    timestamps: true,
    underscored: false
  }
)

export { ORDER }
