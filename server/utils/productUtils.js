// paginate.js

module.exports.paginate = async (model, query, conditions = {}) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 12;
  const skip = (page - 1) * limit;

  const totalItems = await model.countDocuments(conditions);
  const totalPages = Math.ceil(totalItems / limit);

  const results = await model.find(conditions).skip(skip).limit(limit);

  return {
    results,
    totalPages,
    currentPage: page,
  };
};

module.exports.parsePopulateFields = (req) => {
  return req.query.populate ? req.query.populate.split(',') : [];
};
