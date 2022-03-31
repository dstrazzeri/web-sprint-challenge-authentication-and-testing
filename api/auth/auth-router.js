const router = require('express').Router();
const Users = require('./auth-model');
const { JWT_SECRET } = require('../secrets/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { checkBody, checkUsernameExists, checkLogin } = require('./auth-middleware');


const makeToken = user => {
    const payload = {
        subject: user.id,
        username: user.username,
    }
    const options = {
        expiresIn: '1d',
    }
    return jwt.sign(payload, JWT_SECRET, options);
};


router.post('/register', checkBody, checkUsernameExists,(req, res, next) => {
    const { username, password } = req.body;
    const hash = bcrypt.hashSync(password, 8);

  Users.addUser({username, password: hash})
      .then(user => {
        res.json(user);
      })
      .catch(next)
});


router.post('/login', checkBody, checkLogin, (req, res, next) => {
    const { password } = req.body
    if(bcrypt.compareSync(password, req.user.password)) {
        const token = makeToken(req.user)
        res.json({
            message: `Welcome, ${req.user.username}`,
            token
        })
    } else {
        next({status: 401, message: `invalid credentials`});
    }
});


module.exports = router;
