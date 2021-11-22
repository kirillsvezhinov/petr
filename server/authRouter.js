const Router = require('express')
const router = new Router();
const controller = require('./authController')
const {check} = require('express-validator')

router.post('/registration',[
    check('username', "user name is not be empty").notEmpty(),
    check('password',"Password must be longer than 10 characters").isLength({min:10,max:20})
],controller.registration)
router.post('/login',controller.login)
router.get('/users',controller.getUsers)


module.exports = router