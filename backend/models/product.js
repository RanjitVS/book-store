const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema//ObjectId is a field in the category database

const productSchema= new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            maxlength:1000
        },
        description:{
            type:String,
            trim:true,//removes any spaces in start or end
            required:true,
            maxlength:1000
        },
        price:{
            type:Number,
            trim:true,//removes any spaces in start or end
            required:true,
        },
        category:{
            type:ObjectId,//product's category will refer to the category model.
            ref:'Category',//link to the category model
            required:true
        },
        quantity:{
            type:Number
        },
        sold:{
            type:Number,
            default:0
        },
        photo:{
            data:Buffer,
            contentType:String
        }
    },{timestamps:true}
);

module.exports=mongoose.model('Product',productSchema);