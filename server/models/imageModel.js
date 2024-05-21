const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const _schema = new Schema({
    filename: {
        type: String,
    },
    type:{
        type:String
    },
    content:{
        type:String
    }
    
}, {timestamps:true});

module.exports = mongoose.model('documents', _schema)