const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FreeEGoPASS = sequelize.define('FreeEGoPASS', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idGoPass: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "0",
    },
}, {
    tableName: 'free_egopasses',
    timestamps: true,
    paranoid: true,
})

module.exports = FreeEGoPASS;
