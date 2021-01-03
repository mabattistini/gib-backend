/**
 * Arquivo: routes/user.js
 * Descrição: arquivo responsável pelas rotas da classe 'Users'
 * Data: 31/12/2020
 * Author: Marcelo Battistini
 */

const express = require('express');
const router = express.Router();

const postController = require('../controllers/post.controller')

router.post('/create',postController.savePost )
router.delete('/:id',postController.deletePost )

module.exports = router