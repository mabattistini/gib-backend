/**
 * Arquivo: routes/user.js
 * Descrição: arquivo responsável pelas rotas da classe 'Users'
 * Data: 31/12/2020
 * Author: Marcelo Battistini
 */

const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create',userController.createUser )
router.post('/login',userController.login )
router.get('/all',userController.listAllUsers )
router.get('/:id',userController.findUserById )
router.put('/:id',userController.updateUserById )
router.delete('/:id',userController.deleteUserById )

module.exports = router;
