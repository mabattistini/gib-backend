
const mongodb = require('./../config/mongodb')


exports.save = async (req, res) => {
    mongodb.mongoClient().then((client) => {
        client.collection('posts').save(req.body, (err, result) => {
            if (err)  res.status(200).send({result: "error", message: err})
            else {
                console.log(result)
                res.status(200).send({result: "success", message: "OK"})
            }
        })
    })
}

exports.delete = async (req, res) => {
    mongodb.mongoClient().then((client) => {
        const id = req.params.id;
        console.log(id)
        client.collection('posts').deleteOne(id, (err, result) => {
            if (err)  res.status(200).send({result: "error", message: err})
            else {
                console.log(result)
                res.status(200).send({result: "success", message: "OK"})
            }
        })
    })
}