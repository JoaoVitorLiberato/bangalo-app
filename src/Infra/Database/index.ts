import dotenv from "dotenv"
import { Sequelize, Dialect } from "sequelize"

dotenv.config()

const DATABASE = new Sequelize(
  process.env.MARIADB_DATABASE as string,
  process.env.MARIADB_USER as string,
  process.env.MARIADB_PASSWORD as string,
  {
    dialect: process.env.MARIADB_DIALECT as Dialect,
    host: process.env.MARIADB_HOST as string,
    port: Number(process.env.MARIADB_PORT as string)
  }
)

export const connectDatabase = async () => {
  try {
    await DATABASE.authenticate();
  } catch {
    console.log("Houve um erro ao conectar com o banco de dados, por favor, tente novamente.");
  }
}

Object.assign(DATABASE, { connectDatabase })

export default DATABASE
