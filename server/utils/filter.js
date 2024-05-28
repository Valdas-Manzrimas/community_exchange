module.exports.filterProducts = async (req, Product) => {
  const { name, category, condition, location, isAvailable } = req.query;
  const userId = req.user._id;
  const communityId = req.params.communityId; // Assuming the communityId is passed as a parameter

  const filters = {};
  if (name) {
    filters.name = { $regex: name, $options: 'i' };
  }
  if (category) {
    filters.category = { $eq: category };
  }
  if (condition) {
    filters.condition = { $eq: condition };
  }
  if (location) {
    filters.location = { $eq: location };
  }
  if (isAvailable) {
    filters.isAvailable = { $eq: isAvailable };
  }

  const products = await Product.find({
    $or: [
      { community: communityId }, // Filter products where the user is the owner
      { community: { $elemMatch: { users: userId } } }, // Filter products where the userId is a member of the community
    ],
    ...filters,
  });

  return products;
};
