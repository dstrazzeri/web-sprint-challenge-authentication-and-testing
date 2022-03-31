const db = require('../../data/dbConfig');


const checkBody = (req, res, next) => {
    const { username, password } = req.body;
    if(!username || !password) {
        next({status: 401, message: `username and password required`});
    } else { next() }
};


const checkUsernameExists = async (req, res, next) => {
    const { username } = req.body;
    try {
        const user = await db('users').where({ username }).first()
        if(user){
            next({status: 401, message: `username taken`})
        } else { next() }
    }
    catch (err) {
        next(err)
    }
};


const checkLogin = async (req, res, next) => {
    const { username } = req.body;
    try {
        const user = await db('users').where({username}).first();
        if(user) {
            req.user = user;
            next();
        } else {
            next({status: 404, message: `invalid credentials`});
        }
    }
    catch (err) {
        next(err)
    }
};


module.exports = {
    checkBody,
    checkUsernameExists,
    checkLogin,
};
