const mongoose =require("mongoose");
const Schema = mongoose.Schema;
// const passportLocalMongoose=require("passport-local-mongoose")

const userSchema =new Schema({
    name:String,
    photo:String,
    googleId:{
        type:String,
        required:true,
        unique:true,
        
    },
    role:{
        type:"String",
        enum:["admin","user"],
        default:"user"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

// userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User',userSchema);