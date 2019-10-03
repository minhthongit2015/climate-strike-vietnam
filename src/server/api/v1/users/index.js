const router = require('express').Router();
const SigninRoute = require('./signin');
const SignoutRoute = require('./signout');
const SignupRoute = require('./signup');
const ProfileRoute = require('./profile');

const UserService = require('../../../services/user/User');
const APIResponse = require('../../../models/api-models');
const Logger = require('../../../services/Logger');

router.use('/signin', SigninRoute);
router.use('/signout', SignoutRoute);
router.use('/signup', SignupRoute);
router.use('/profile', ProfileRoute);

router.get('/list', async (req, res) => {
  try {
    const users = await UserService.list();
    return res.send(new APIResponse().setData({ users }));
  } catch (error) {
    Logger.error(error.message, { stack: error.stack });
    return res.status(400).send(
      new APIResponse().setError({ message: error.message, stack: error.stack })
    );
  }
});

router.get('/fbLogin', (req, res) => {
  Logger.catch(() => res.send(
    new APIResponse().setData(req.session.user || null)
  ));
});

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const users = await UserService.get(userId);
    return res.send(new APIResponse().setData({ users }));
  } catch (error) {
    Logger.error(error.message, { stack: error.stack });
    return res.status(400).send(
      new APIResponse().setError({ message: error.message, stack: error.stack })
    );
  }
});

module.exports = router;
