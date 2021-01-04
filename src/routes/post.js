/**
 * Arquivo: routes/post.js
 * Descrição: arquivo responsável pelas rotas da classe 'Posts'
 * Data: 02/01/2021
 * Author: Marcelo Battistini
 */

const express = require('express');
const authMiddleware = require('../middlewares/auth')
const router = express.Router();

router.use(authMiddleware)

const userController = require('../controllers/auth.controller')
const {createPost} = require("../controllers/postController");

/* GET post listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/',createPost)

module.exports = router