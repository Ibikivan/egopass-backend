const User = require('./User');
const AgentRVA = require('./AgentRVA');
const Admin = require('./Admin');
const SuperAdmin = require('./SuperAdmin');
const Traveler = require('./Traveler');
const FreeEGoPASS = require('./FreeEGoPASS');
const PayedEGoPASS = require('./PayedEGoPASS');
const Payement = require('./Payement');
const BankCard = require('./BankCard');
const MobilMoney = require('./MobilMoney');
const sequelize = require('../config/database');

User.hasOne(AgentRVA, { foreignKey: 'id', as: 'agentRVA' });
AgentRVA.belongsTo(User, { foreignKey: 'id' });

User.hasOne(Admin, { foreignKey: 'id', as: 'admin' });
Admin.belongsTo(User, { foreignKey: 'id' });

User.hasOne(SuperAdmin, { foreignKey: 'id', as: 'superAdmin' });
SuperAdmin.belongsTo(User, { foreignKey: 'id' });

User.hasMany(Traveler, { foreignKey: 'id', as: 'traveler' });
Traveler.belongsTo(User, { foreignKey: 'id' });

Traveler.hasOne(FreeEGoPASS, { foreignKey: 'id', as: 'freeEGoPASS' });
FreeEGoPASS.belongsTo(Traveler, { foreignKey: 'id' });

Traveler.hasOne(PayedEGoPASS, { foreignKey: 'id', as: 'payed' });
PayedEGoPASS.belongsTo(Traveler, { foreignKey: 'id' });

PayedEGoPASS.hasOne(Payement, { foreignKey: 'id', as: 'payement' });
Payement.belongsTo(PayedEGoPASS, { foreignKey: 'id' });

Payement.hasOne(BankCard, { foreignKey: 'id', as: 'bankCard' });
BankCard.belongsTo(Payement, { foreignKey: 'id' });

Payement.hasOne(MobilMoney, { foreignKey: 'id', as: 'mobilMoney' });
MobilMoney.belongsTo(Payement, { foreignKey: 'id' });

const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('✅ Base de données synchronisée avec succès.');
    } catch (error) {
        console.error('❌ Erreur de synchronisation de la base de données :', error);
        throw new Error("❌ Erreur de synchronisation de la base de données :", error);
    }
};

async function testDbConnexion() {
    try {
        await sequelize.authenticate();
        console.log('✅ Connection has been established successfully.');
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
        throw new Error('❌ Unable to connect to the database:', error);
    }
}

module.exports = {
    testDbConnexion,
    syncDatabase,
    sequelize,
    User,
    AgentRVA,
    Admin,
    SuperAdmin,
    Traveler,
    FreeEGoPASS,
    PayedEGoPASS,
    Payement,
    BankCard,
    MobilMoney,
};
