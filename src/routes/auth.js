/**
 * Arquivo: routes/auth.js
 * Descrição: arquivo responsável pelas rotas da classe 'Users'
 * Data: 31/12/2020
 * Author: Marcelo Battistini
 */

const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller')

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('/register',authController.createUser )
router.post('/authenticate',authController.authenticate )
router.post('/forgot_password', authController.forgotPassword)
router.post('/reset/password', authController.resetPassword)



module.exports = router;
