const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User= require('./User');

const SuperAdmin = sequelize.define('SuperAdmin', {
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
    },
}, {
    tableName: 'super_admins',
    timestamps: true,
    paranoid: true,
})

module.exports = SuperAdmin;
