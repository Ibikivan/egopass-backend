const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BankCard = sequelize.define('BankCard', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cardNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expirationDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    cvv: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    owner: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'bank_cards',
    timestamps: true,
    paranoid: true,
})

module.exports = BankCard;
