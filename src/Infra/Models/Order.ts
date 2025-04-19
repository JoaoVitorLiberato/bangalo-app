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
    segmento: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    endereco: {
      type: DataTypes.JSON,
      allowNull: false
    },
    messagem: {
      type: DataTypes.STRING,
    },
    produtos: {
      type: DataTypes.JSON,
      allowNull: false
    },
    pagamento: {
      type: DataTypes.JSON,
      allowNull: false
    },
    analytics: {
      type: DataTypes.JSON,
      allowNull: false
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
    modelName: "order",
    timestamps: true,
    underscored: false
  }
)

export { ORDER }
