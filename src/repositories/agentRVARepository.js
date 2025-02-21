const { AgentRVA } = require('../models/index');

const createAgentRVA = async (agentData, transaction = null) => {
    return await AgentRVA.create(agentData, { transaction });
};

const updateAgentRVA = async (id, agentData, transaction = null) => {
    return await AgentRVA.update(agentData, { where: { id }, returning: true, transaction });
};

module.exports = {
    createAgentRVA,
    updateAgentRVA,
};
