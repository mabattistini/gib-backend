/**
 * Arquivo: config/postgresql.js
 * Descrição: arquivo responsável pelas 'connectionStrings da aplicação: PostgreSQL.
 * Data: 31/12/2020
 * Author: Marcelo Battistini
 */

const { Pool } = require('pg');
const path = require('path')
const {host, port, database, user, password} = require(path.resolve('./config/postgresConfig.json'))


// ==> Conexão com a Base de Dados:
const pool = new Pool({
    host,
    port,
    database,
    user,
    password
});

pool.on('connect', () => {
    console.log('Base de Dados conectado com sucesso!');
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
