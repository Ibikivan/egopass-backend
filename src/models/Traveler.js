const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Traveler = sequelize.define('Traveler', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    passId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    flyType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    postNom: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    nationality: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    passeportNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    flyCompany: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    flyNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    provenance: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    destination: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
            isEmail: true,
        },
    },
    homeAddress: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'travelers',
    timestamps: true,
    paranoid: true,
});

module.exports = Traveler;
