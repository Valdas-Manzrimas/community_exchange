// community.routes.js
const { verifyToken, isAdmin } = require('../middlewares/authJwt');
const controller = require('../controllers/community.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
  });

  app.get('/api/community/:id', verifyToken, controller.getCommunityById);
  app.post(
    '/api/community',
    [verifyToken, isAdmin],
    controller.createCommunity
  );
  app.put(
    '/api/community/:id',
    [verifyToken, isAdmin],
    controller.updateCommunity
  );
  app.delete(
    '/api/community/removeMember/:userId',
    verifyToken,
    controller.removeUserFromCommunity
  );
};
