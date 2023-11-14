const { verifySignUp } = require('../middlewares');
const { verifyToken } = require('../middlewares/authJwt');
const controller = require('../controllers/auth.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
  });

  app.post(
    '/api/auth/register',
    [verifySignUp.checkDuplicateEmail, verifySignUp.checkRolesExisted],
    controller.signup
  );

  app.post('/api/auth/login', controller.signin);

  app.post('/api/auth/logout', controller.signout);

  app.post('/api/auth/verifyToken', verifyToken, (req, res) => {
    res.json({ valid: true, userId: req.userId });
  });
};
