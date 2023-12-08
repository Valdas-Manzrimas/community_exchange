//community.routes.js
const { verifyToken } = require('../middlewares/authJwt');
const controller = require('../controllers/community.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
  });

  // Route for creating a community and user
  app.post('/api/register/community-user', controller.createCommunityAndUser);

  app.get('/api/community/:id', verifyToken, controller.getCommunityById);
};
