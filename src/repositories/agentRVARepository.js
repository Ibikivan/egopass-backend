const { AgentRVA } = require('../models/index');

const createAgentRVA = async (agentData, transaction = null) => {
    return await AgentRVA.create(agentData, { transaction });
};

module.exports = {
    createAgentRVA,
};
