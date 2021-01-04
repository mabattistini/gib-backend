/**
 * Arquivo: controllers/postController.js
 * Descrição: arquivo responsável pelo CRUD da classe 'Posts'
 * Data: 01/01/2021
 * Author: Marcelo Battistini
 */

const db = require('../modules/postgresql');


exports.createPost = async (req, res) => {
    const {email, full_name, password, phone_number} = req.body;
    try {
        const response = await db.query(
            'INSERT INTO posts (user_id) VALUES($1) returning id;',
            [req.userId],
        );
        let postId = response.rows[0].id

        res.status(201).send({
            result: "success",
            message: 'Post added successfully!',
            post_id: postId
        });
    } catch (e) {
        res.status(200).send({result: "error", message: e.message})
    }
};