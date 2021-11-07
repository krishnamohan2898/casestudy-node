const mongoose = require('mongoose')

let MongooseSchema = mongoose.Schema

const moviSchema = new MongooseSchema(
    {
        moviename:String,
        actor:String,
        
        director:String,
        review:String

    }
)

var moviModel = mongoose.model('movis',moviSchema)

module.exports = {moviModel}