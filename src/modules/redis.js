/**
 * Arquivo: src/modules/redis.js
 * Descrição: arquivo responsável pela 'connection da aplicação: Redis.
 * Data: 31/12/2020
 * Author: Marcelo Battistini
 *
 */

import redis from "redis";
import {host, port} from '../../config/redisConfig.json'

const client = redis.createClient({
    host      : host,
    port      : port
});


export default client


