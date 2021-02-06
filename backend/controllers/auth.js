const User = require('../models/user')
const jwt = require('jsonwebtoken');//generate signed token
const expressJwt=require('express-jwt');//authorization check
exports.signup=(req,res)=>{
    console.log('req.body',req.body);
    const user=new User(req.body);
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                err
            })
        }
        user.salt=undefined;
        user.hashed_password=undefined;
        res.json({
            user
        })
    })
}

exports.signin=(req,res)=>{
    //find the user on the basis of email
    const{email,password}=req.body
    User.findOne({email},(err,user)=>{
        if(err||!user){
            return res.status(400).json({
                error:"user with that email is not in the database, try signing up first"
            })
        }
        //if we find the user make sure the email and passwords match
        //create authenticate method in user model
        if(!user.authenticate(password)){
            return res.status(401).json({
                error:"Email and password do not match"
            })
        }

        //generate a signed token with user id and secret
        const token=jwt.sign({_id:user._id},process.env.JWT_SECRET)
        //when we sign in we put the token 't' in response cookie 
        res.cookie('t',token,{expire:new Date()+9999})

        //return response with user and token to frontend client
        const {_id,name,email,role}=user;
        return res.json({token,user:{_id,email,name,role}})
    })
}

exports.signout=(req,res)=>{
    //we just need to clear the cookie t
    res.clearCookie('t');
    res.json({message:'Signout successful'});
}

exports.requireSignin=expressJwt({
    secret:process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty:"auth"
});



exports.isAuth=(req,res,next)=>{
    let user=req.profile&&req.auth&&req.profile._id==req.auth._id
    if(!user){
        return res.status(403).json({
            error:"Access denied"
        })
    }
    next();
}

exports.isAdmin=(req,res,next)=>{
    if(req.profile.role===0){//role 0 means user is not an admin
        return res.status(403).json({
            error:"this is an admin resource, access denied"
        })
    }
    next();
}