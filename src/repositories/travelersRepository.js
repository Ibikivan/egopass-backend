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
      {model: FreeEGoPASS, as: "freePass"},
      {model: PayedEGoPASS, as: "payedPass"},
    ]
  });
};

const getAll = async(filters={}, transaction=null) => {
  let whereClause = {}

  if (filters._activated === filters._disactivated) {
    whereClause = {}
  } else if (filters._activated === "true") {
    whereClause = { status: "ACTIVATED" }
  } else if (filters._disactivated === "true") {
    whereClause = { status: "DISACTIVATED" }
  }

  console.log(whereClause)

  return await Traveler.findAll({
    transaction,
    order: [['id', 'DESC']],
    include: [
      {
        model: FreeEGoPASS,
        as: "freePass",
        where: whereClause
      },
      {
        model: PayedEGoPASS,
        as: "payedPass",
        // where: whereClause
      },
    ]
  });
};

const updateTraveler = async (id, travelerData, transaction = null) => {
  return await Traveler.update(travelerData, { where: { id }, returning: true, transaction });
};

const deleteTraveler = async (id, transaction = null) => {
  return await Traveler.destroy({ where: { id }, transaction });
};

module.exports = {
    createTraveler,
    getTravelerById,
    getAll,
    updateTraveler,
    deleteTraveler,
};
