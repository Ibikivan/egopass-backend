const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PayedEGoPASS = sequelize.define('PayedEGoPASS', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    amount: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('ACTIVATED', 'DISACTIVATED'),
        allowNull: false,
        defaultValue: 'ACTIVATED',
    },
}, {
    tableName: 'payed_egopasses',
    timestamps: true,
    paranoid: true,
})

module.exports = PayedEGoPASS;
