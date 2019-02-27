let express = require('express');

let mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    time:{
        type:Date,
        default:Date.now
    },
    kind:{
        type:String,
    },
    amount:{
        type:Number,
        default:0
    },
    information:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});