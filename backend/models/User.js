import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const User = sequelize.define("User", {
    name: { type: DataTypes.STRING(60), allowNull: false },
    email: { type: DataTypes.STRING(120), unique: true, allowNull: false },
    address: { type: DataTypes.STRING(400) },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM("ADMIN", "USER", "OWNER"), allowNull: false }
});

export default User;
