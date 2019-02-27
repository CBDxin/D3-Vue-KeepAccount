let express = require('express');

let mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    username:String,
    isAdmin:{
        type:Boolean,
        default:false
    },
    avater:{
        type:String,
        default:'http://localhost:3001/public/img/avater.jpg'
    }
});