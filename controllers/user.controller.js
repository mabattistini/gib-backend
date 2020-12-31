/**
 * Arquivo: controllers/user.controller.js
 * Descrição: arquivo responsável pelo CRUD da classe 'Users'
 * Data: 31/12/2020
 * Author: Marcelo Battistini
 */

const md5 = require('md5');

const db = require('../config/database');


// ==> Método responsável por criar um novo 'User':
exports.createUser = async (req, res) => {
    const {email, full_name, password, phone_number} = req.body;
    try {
        const response = await db.query(
            'INSERT INTO users (email, full_name, "password", phone_number) VALUES($1, $2, $3, $4) returning id;',
            [email, full_name, md5(password), phone_number],
        );
        let userId = response.rows[0].id

        res.status(201).send({
            result: "success",
            message: 'User added successfully!',
            user_id: userId
        });
    } catch (e) {
        res.status(200).send({result: "error", message: e.message})
    }

};

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

// ==> Método responsável por validar o login de um 'User':
exports.login = async (req, res) => {
    const username = req.body.email
    const password = md5(req.body.password)

    const response = await db.query('SELECT * FROM USERS WHERE EMAIL = $1', [username])
    let user;
    if (response.rows.length === 0) {
        res.status(200).send({result: "error", message: "Email ou senha inválido"})
    } else {
        user = response.rows[0]
        if (user.accout_confirmed === 0)
            res.status(200).send({result: "error", message: "Você não confirmou o seu cadastro"})
        else  res.status(200).send({result: "success", message: "Login efetuado com sucesso", user: response.rows[0]})
    };
}