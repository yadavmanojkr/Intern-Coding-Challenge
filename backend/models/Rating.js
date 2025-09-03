import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Rating = sequelize.define("Rating", {
    value: { type: DataTypes.INTEGER, allowNull: false }
});

export default Rating;
