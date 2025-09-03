import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Store = sequelize.define("Store", {
    name: { type: DataTypes.STRING(120), allowNull: false },
    email: { type: DataTypes.STRING(120) },
    address: { type: DataTypes.STRING(400), allowNull: false },
});

export default Store;
