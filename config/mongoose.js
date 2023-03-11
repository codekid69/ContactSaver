const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://codekid69:witcyii007@cluster0.ba4uiba.mongodb.net/?retryWrites=true&w=majority');

const db=mongoose.connection;
db.on('error',console.error.bind(console,"Error In Database Connecion"));

db.once('open',function(){
    console.log("Connected to Databse");
})