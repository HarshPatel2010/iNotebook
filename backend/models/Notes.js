const mongoose = require("mongoose")
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:"General"
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
module.exports = mongoose.model('notes',NotesSchema)