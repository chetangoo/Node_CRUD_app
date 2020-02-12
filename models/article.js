const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path = require("path");

const Schema = mongoose.Schema;
const articleSchema = new Schema({
    
    // _id:Schema.Types.ObjectId,

    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    // books:[
    //     {type: mongoose.Schema.Types.ObjectId, ref: 'Book'}
    // ],
    body:{
        type: String,
        required: true
    }

});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article ;

// Article.create({
//     title:"Fifth Title",
//     author:"Chetan",
//     body:"Awsome Body"
// },(error,data) => {
//     if(error){
//         console.log("Error has Occured");
//         console.log(error);
//     }else{
//         console.log('Successfully submitted the data');
//         console.log(data);
//     }
// });