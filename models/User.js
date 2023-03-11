const mongoose=require('mongoose');
const Userschema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:4
    },
    email:{
        type:String,
        required:true,
        unique:true,
        min:7
    },
    password:{
        type:String,
        required:true,
        min:7
    },
    contacts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Contact'
        }
    ]
},{timestamps: true});

module.exports=mongoose.model('User',Userschema);