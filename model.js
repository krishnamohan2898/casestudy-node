const mongoose = require('mongoose')

let MongooseSchema = mongoose.Schema

const moviSchema = new MongooseSchema(
    {
        moviename:String,
        actor:String,
        actress:String,
        director:String,
        releaseyear:String,
        camera:String,
        producer:String,
        language:String

    }
)

var moviModel = mongoose.model('movis',moviSchema)

module.exports = {moviModel}