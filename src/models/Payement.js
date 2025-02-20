const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Payement = sequelize.define('Payement', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idPayement: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    statut: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    amount: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "0",
    },
    paymentType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    reference: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'payements',
    timestamps: true,
    paranoid: true,
})

module.exports = Payement;
