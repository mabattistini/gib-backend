const MongoClient = require("mongodb").MongoClient;

const mongoClient = function () {
    return new Promise((resolve, reject) => {
        const uri = "mongodb://localhost"
        MongoClient.connect(uri, (err, client) => {
            if (err) reject(Error(err))
            db = client.db('guib')
            resolve(db)
        })
    })
}


module.exports = { mongoClient}