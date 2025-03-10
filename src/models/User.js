const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // Rôle pour différencier les types d'utilisateurs
    role: {
        type: DataTypes.ENUM('ABONNE', 'AGENT_RVA', 'ADMIN', 'SUPER_ADMIN'),
        allowNull: false,
        defaultValue: 'ABONNE',
    },
    // Informations personnelles communes
    firstName: {  // Correspond à "Prénom"
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {   // Correspond à "Nom"
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    resetCode: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    resetCodeExpires: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    tableName: 'users',
    timestamps: true,
    paranoid: true,
});

User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
}

module.exports = User;
