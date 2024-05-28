// paginate.js

module.exports.paginate = async (products, query) => {
  if (!Array.isArray(products)) {
    throw new Error('products parameter must be an array');
  }

  const page = parseInt(query?.page) || 1;
  const limit = parseInt(query?.limit) || 12;
  const skip = (page - 1) * limit;

  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / limit);

  const results = products.slice(skip, skip + limit);

  return {
    results,
    totalPages,
    currentPage: page,
    totalItems,
  };
};

module.exports.parsePopulateFields = (req) => {
  return req.query.populate ? req.query.populate.split(',') : [];
};
