/**
 * Arquivo: src/controllers/user.controller.js
 * Descrição: arquivo responsável pelo CRUD da classe 'Users'
 * Data: 31/12/2020
 * Author: Marcelo Battistini
 */

const db = require('../config/database');

// ==> Método responsável por criar um novo 'User':
exports.createUser = async (req, res) => {
    const { User_name, quantity, price } = req.body;
    const response = await db.query(
        'INSERT INTO Users (User_name, quantity, price) VALUES ($1, $2, $3)',
        [User_name, quantity, price],
    );

    res.status(201).send({
        message: 'User added successfully!',
        body: {
            User: { User_name, quantity, price },
        },
    });
};

// ==> Método responsável por listar todos os 'Users':
exports.listAllUsers = async (req, res) => {
    const response = await db.query(
        'SELECT * FROM Users ORDER BY User_name ASC',
    );
    res.status(200).send(response.rows);
};

// ==> Método responsável por selecionar 'User' pelo 'Id':
exports.findUserById = async (req, res) => {
    const UserId = parseInt(req.params.id);
    const response = await db.query(
        'SELECT * FROM Users WHERE Userid = $1',
        [UserId],
    );
    res.status(200).send(response.rows);
};

// ==> Método responsável por atualizar um 'User' pelo 'Id':
exports.updateUserById = async (req, res) => {
    const UserId = parseInt(req.params.id);
    const { User_name, quantity, price } = req.body;

    const response = await db.query(
        'UPDATE Users SET User_name = $1, quantity = $2, price = $3 WHERE UserId = $4',
        [User_name, quantity, price, UserId],
    );

    res.status(200).send({ message: 'User Updated Successfully!' });
};

// ==> Método responsável por excluir um 'User' pelo 'Id':
exports.deleteUserById = async (req, res) => {
    const UserId = parseInt(req.params.id);
    await db.query('DELETE FROM Users WHERE UserId = $1', [
        UserId,
    ]);

    res.status(200).send({ message: 'User deleted successfully!', UserId });
};
