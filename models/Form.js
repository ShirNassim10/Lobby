const mongoose = require('mongoose');
const { express } = require('express');

const formSchema = mongoose.Schema({
    name: { type: String, require: true },
    json:{type: String},
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    viewers:[
        {date:{type:String},amount:{type:Number}}
    ],
    submitions:[{type:String}]
    
})

module.exports = mongoose.model('Form', formSchema);