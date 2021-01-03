/**
 * Arquivo: src/controllers/auth.controller.js
 * Descrição: arquivo responsável pelo grenciamento de chaves Redis
 * Data: 31/12/2020
 * Author: Marcelo Battistini
 */

const redis = require('./../config/redis')

redis.on('error', function (err) {
    console.log('Error ' + err);
});

exports.setRedis = function (key, value,expire = null) {
    return new Promise((resolve, reject) => {
        try {
            redis.set(key, value)
            if (expire == null) {
                redis.expire(key, expire);
            }
            resolve(true)
        } catch (e) {
            reject(Error(e.message))
        }
    })
}

exports.getRedis = function (key) {
    return new Promise((resolve, reject) => {
        try {
            resolve(redis.get(key))
        } catch (e) {
            reject(Error(e.message))
        }
    })
}

