// import mongoose from 'mongoose';
const mongoose = require("mongoose")
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:String,
       default: Date.now
    }
  
    // import mongoose from 'mongoose';
    // const { Schema } = mongoose;
  
    // const blogSchema = new Schema({
    //   title:  String, // String is shorthand for {type: String}
    //   author: String,
    //   body:   String,
    //   comments: [{ body: String, date: Date }],
    //   date: { type: Date, default: Date.now },
    //   hidden: Boolean,
    //   meta: {
    //     votes: Number,
    //     favs:  Number
    //   }
    // });
});
module.exports = mongoose.model('user',UserSchema)