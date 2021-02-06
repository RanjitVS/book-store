const mongoose=require('mongoose')


const categorySchema= new mongoose.Schema(
    {
        name:{
            type:String,
            trim:true,//removes any spaces in start or end
            required:true,
            maxlength:32,
            unique:true
        }
    },{timestamps:true}//gives created on and updated on fields in each entry
);
module.exports=mongoose.model('Category',categorySchema);