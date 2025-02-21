const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FreeEGoPASS = sequelize.define('FreeEGoPASS', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    amount: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "0",
    },
    status: {
        type: DataTypes.ENUM('ACTIVATED', 'DISACTIVATED'),
        allowNull: false,
        defaultValue: 'ACTIVATED',
    },
}, {
    tableName: 'free_egopasses',
    timestamps: true,
    paranoid: true,
})

module.exports = FreeEGoPASS;
