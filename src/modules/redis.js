/**
 * Arquivo: config/postgresql.js
 * Descrição: arquivo responsável pela 'connection da aplicação: Redis.
 * Data: 31/12/2020
 * Author: Marcelo Battistini
 *
 */


import redis from "redis";

const client = redis.createClient({
    host      : '120.0.0.1',
    port      : 6379
});


export default client


