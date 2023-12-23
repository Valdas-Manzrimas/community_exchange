// community.routes.js
const { verifyToken } = require('../middlewares/authJwt');
const controller = require('../controllers/community.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
  });

  app.get('/api/community/:id', verifyToken, controller.getCommunityById);
  app.post('/api/community', verifyToken, controller.createCommunity);
  app.put('/api/community/update/:id', verifyToken, controller.updateCommunity);

  app.delete(
    '/api/community/removeMember/',
    verifyToken,
    controller.removeUserFromCommunity
  );

  app.get('/api/communities', verifyToken, controller.getAllUserCommunities);
};
