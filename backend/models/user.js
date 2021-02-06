const mongoose=require('mongoose')
const crypto = require('crypto')//nodejs module to hash the password
const { v1: uuidv1 } = require('uuid');//for genrerating unique strings


const userSchema= new mongoose.Schema(
    {
        name:{
            type:String,
            trim:true,//removes any spaces in start or end
            required:true,
            maxlength:32
        },
        email:{
            type:String,
            trim:true,
            required:true,
            unique:32
        },
        hashed_password:{
            type:String,
            required:true
        },
        about:{
            type:String,
            trim:true,
        },
        salt:String,//long string used to generate the hashed password
        role:{
            type:Number,
            default:1
        },
        history:{
            type:Array,
            default:[]
        }
    },{timestamps:true}
);


//virtual fields

userSchema.virtual('password')//sending password from client side
.set(function(password){//password from the client side
    this._password=password
  this.salt=uuidv1()//gives a random string
  this.hashed_password=this.encryptPassword(password)
})

.get(function(){
    return this._password;
})

userSchema.methods={
    authenticate(plainText){
        return this.encryptPassword(plainText)===this.hashed_password
    },
    encryptPassword:function(password){
        if(!password) return '';
        try{
            return crypto.createHmac('sha1',this.salt)
            .update(password)
            .digest('hex')
        }catch(err){
            return '';
        }
    }
}

module.exports=mongoose.model('User',userSchema);