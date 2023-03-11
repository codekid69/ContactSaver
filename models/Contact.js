const mongoose=require('mongoose');
const Userschema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:4
    },
    contact:{
        type:String,
        required:true,
        min:10,
    }
},{timestamps: true});

module.exports=mongoose.model('Contact',Userschema);