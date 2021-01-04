/**
 * Arquivo: routes/user.js
 * Descrição: arquivo responsável pelas rotas da classe 'Users'
 * Data: 31/12/2020
 * Author: Marcelo Battistini
 */

const express = require('express');
const authMiddleware = require('../middlewares/auth')
const router = express.Router();

router.use(authMiddleware)

const userController = require('../controllers/auth.controller')

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});


router.get('/all',userController.listAllUsers )
router.get('/:id',userController.findUserById )
router.put('/:id',userController.updateUserById )
router.delete('/:id',userController.deleteUserById )

module.exports = router;
