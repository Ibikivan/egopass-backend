const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MobilMoney = sequelize.define('MobilMoney', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    operatorName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'mobil_moneys',
    timestamps: true,
    paranoid: true,
});

module.exports = MobilMoney;
