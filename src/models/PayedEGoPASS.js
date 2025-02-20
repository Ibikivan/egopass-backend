const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PayedEGoPASS = sequelize.define('PayedEGoPASS', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idGoPass: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'payed_egopasses',
    timestamps: true,
    paranoid: true,
})

module.exports = PayedEGoPASS;
