const { Traveler, FreeEGoPASS, PayedEGoPASS } = require('../models/index');

const createTraveler = async (travelData, transaction = null) => {
  // Vérifier si ce pass est déjà associé à un voyage
  const existingTravel = await Traveler.findOne({ 
    where: { passId: travelData.passId },
    transaction
  });
  if (existingTravel) {
    throw new Error("Ce pass est déjà associé à un voyage");
  }
  return await Traveler.create(travelData, { transaction });
};

const getTravelerById = async(id, transaction = null) => {
  return await Traveler.findByPk(id, {
    transaction,
    include: [
        {model: FreeEGoPASS, as: "freeEGoPASS"},
        {model: PayedEGoPASS, as: "payedEGoPASS"},
    ]
  });
}

const updateTraveler = async (id, travelerData, transaction = null) => {
  return await Traveler.update(travelerData, { where: { id }, returning: true, transaction });
};

const deleteTraveler = async (id, transaction = null) => {
  return await Traveler.destroy({ where: { id }, transaction });
};

module.exports = {
    createTraveler,
    getTravelerById,
    updateTraveler,
    deleteTraveler,
};
