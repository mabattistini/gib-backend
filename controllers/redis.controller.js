/**
 * Arquivo: src/controllers/user.controller.js
 * Descrição: arquivo responsável pelo grenciamento de chaves Redis
 * Data: 31/12/2020
 * Author: Marcelo Battistini
 */

const redis = require('./../config/redis')

exports.setRedis = function (key, value) {
    return new Promise((resolve, reject) => {
        try {
            redis.set(key, value)
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

