//user.routes.js
const { authJwt } = require('../middlewares');
const controller = require('../controllers/user.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
  });

  app.get('/api/user/all', controller.allAccess);

  app.get(
    '/api/user/allUsers',
    [authJwt.verifyToken, authJwt.isAdmin || authJwt.isModerator],
    controller.getAllUsers
  );
  // current user
  app.get('/api/user/', [authJwt.verifyToken], controller.userBoard);
  // update current user
  app.put('/api/user/update', [authJwt.verifyToken], controller.updateUser);
  // change password
  app.put(
    '/api/user/changePassword',
    [authJwt.verifyToken],
    controller.changePassword
  );
  // delete current user
  app.delete('/api/user/delete', [authJwt.verifyToken], controller.deleteUser);

  app.get(
    '/api/user/mod',
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    '/api/user/admin',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.put(
    '/api/user/setrole',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.setUserRole
  );
};
