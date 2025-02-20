const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User= require('./User');

const Admin = sequelize.define('Admin', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: User,
            key: 'id',
        }
    },
    postNom: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    workplace: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    fonction: {
        type: DataTypes.STRING,
        allowNull: true,
        paranoid: true,
    },
}, {
    tableName: 'admins',
    timestamps: true,
})

module.exports = Admin;
