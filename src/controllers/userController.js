/**
 * Arquivo: controllers/userController.js
 * Descrição: arquivo responsável pelo CRUD da classe 'Users'
 * Data: 31/12/2020
 * Author: Marcelo Battistini
 */

const db = require('../modules/postgresql');
const jwt = require('jsonwebtoken')


// ==> Método responsável por listar todos os 'Users':
exports.listAllUsers = async (req, res) => {
    try {
        const response = await db.query(
            'SELECT * FROM Users ORDER BY full_name ASC',
        );
        res.status(200).send({result:"success",users: response.rows});
    } catch (e) {
        res.status(200).send({result: "error", message: e.message})
    }
};

// ==> Método responsável por selecionar 'User' pelo 'Id':
exports.findUserById = async (req, res) => {
    const UserId = parseInt(req.params.id);

    try {
        const response = await db.query(
            'SELECT * FROM Users WHERE id = $1',
            [UserId],
        );
        if (response.rows.length > 0)
            res.status(200).send({result: "success", users: response.rows[0]});
        else res.status(200).send({result: "error", message: "Registro não encontrado"})
    } catch (e) {
        res.status(200).send({result: "error", message: e.message})
    }
};

// ==> Método responsável por atualizar um 'User' pelo 'Id':
exports.updateUserById = async (req, res) => {
    const UserId = parseInt(req.params.id);
    const {email, full_name, phone_number} = req.body;
    try {
        const response = await db.query(
            'UPDATE Users SET email = $1, full_name = $2, phone_number = $3 WHERE id = $4',
            [email, full_name, phone_number, UserId],
        );

        res.status(200).send({message: 'User Updated Successfully!'});
    } catch (e) {
        res.status(200).send({result: "error", message: e.message})
    }
};

// ==> Método responsável por excluir um 'User' pelo 'Id':
exports.deleteUserById = async (req, res) => {
    const UserId = parseInt(req.params.id);
    try {
        await db.query('DELETE FROM Users WHERE id = $1', [
            UserId,
        ]);

        res.status(200).send({message: 'User deleted successfully!', UserId});
    } catch (e) {
        res.status(200).send({result: "error", message: e.message})
    }
};

