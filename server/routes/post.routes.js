const {
  createPost,
  updatePost,
  getPostById,
  getCommunityPosts,
  deletePost,
} = require('../controllers/post.controller');
const { verifyToken } = require('../middlewares/authJwt');

module.exports = function (app) {
  app.post('/api/post/create', verifyToken, createPost);

  app.put('/api/post/update/:postId', verifyToken, updatePost);

  app.get('/api/post/get/:postId', verifyToken, getPostById);
  app.get('/api/post/getAll/:communityId', verifyToken, getCommunityPosts);

  app.delete('/api/post/delete/:postId', verifyToken, deletePost);
};
