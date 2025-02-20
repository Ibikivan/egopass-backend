const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User= require('./User');

const AgentRVA = sequelize.define('AgentRVA', {
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
        allowNull: false,
    }
}, {
    tableName: 'agents_rva',
    timestamps: true,
    paranoid: true,
})

module.exports = AgentRVA;
