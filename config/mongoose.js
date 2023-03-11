const mongoose=require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.DATABASE);
const db=mongoose.connection;
db.on('error',console.error.bind(console,"Error In Database Connecion"));

db.once('open',function(){
    console.log("Connected to Databse");
})