const mongoose=require('mongoose');


const itemschema=new mongoose.Schema({
    images:String,
    useremail:String
})

const itemmodel=mongoose.model('items',itemschema)

module.exports=itemmodel;
