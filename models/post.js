const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    user_id: {
        type: BigInt,
    },
    title: {
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

const Post = mongoose.model('post', PostSchema)

module.exports = Post