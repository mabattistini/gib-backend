/**
 * Arquivo: controllers/auth.controller.js
 * Descrição: arquivo responsável pelo CRUD da classe 'Users'
 * Data: 31/12/2020
 * Author: Marcelo Battistini
 */

const bcrypt = require('bcryptjs')
const db = require('../modules/postgresql');
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/authConfig.json')
const crypto = require('crypto')
const mailer = require('../modules/nodemailer')

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {expiresIn: authConfig.expiresIn })
}

// ==> Método responsável por criar um novo 'User':
exports.createUser = async (req, res) => {
    const {email, full_name, password, phone_number} = req.body;
    try {
        const response = await db.query(
            'INSERT INTO users (email, full_name, "password", phone_number) VALUES($1, $2, $3, $4) returning id;',
            [email, full_name, bcrypt.hash(password, 10), phone_number],
        );
        let userId = response.rows[0].id

        res.status(201).send({
            result: "success",
            message: 'User added successfully!',
            token: generateToken({id: userId}),
            user_id: userId
        });
    } catch (e) {
        res.status(200).send({result: "error", message: e.message})
    }
};

exports.forgotPassword = async (req, res) => {
    const {email} = req.body

    //try {
        const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);

        if (user.rows.length === 0)
            res.status(400).send({error: "User not found"})
        let userId = user.rows[0].id

        const token = crypto.randomBytes(20).toString('hex')
        const now = new Date()
        now.setHours(now.getHours() + 1)


        const response = await db.query('UPDATE users SET ' +
            'password_reset_token = $1, ' +
            'password_reset_expires = $2 WHERE id = $3', [token, now, userId])

        mailer.sendMail({
            to: email,
            from: 'admin@guib.is',
            subject: 'teste',
            template: 'auth/forgot_password',
            context: {
                token: token
            }
        }, (err) => {
            if (err) {
                console.log(err)
                return res.status(400).send({error: 'Cannot send forgot email password'})
            }
        })

        res.status(200).send({token: token, expires: now})

  //  } catch (e) {
  //      res.status(200).send({result: "error", message: e.message})
  //  }
}

// ==> Método responsável por validar o login de um 'User':
exports.authenticate = async (req, res) => {
    const username = req.body.email
    const password = md5(req.body.password)

    const response = await db.query('SELECT * FROM USERS WHERE EMAIL = $1', [username])
    let user;
    if (response.rows.length === 0) {
        res.status(200).send({result: "error", message: "Email ou senha inválido"})
    } else {
        user = response.rows[0]
        if (!await bcrypt.compare(password, user.password)) {
            res.status(200).send({result: "error", message: "Email ou senha inválido"})
        } else {
            if (user.accout_confirmed === 0)
                res.status(200).send({result: "error", message: "Você não confirmou o seu cadastro"})
            else {
                res.status(200).send({
                    result: "success",
                    message: "Login efetuado com sucesso",
                    token: generateToken({id: user.id}),
                    user: response.rows[0]
                })
            }
        }
    }
}