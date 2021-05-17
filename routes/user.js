const route=require("express").Router();

// path require
const User=require('../model/User');

// password in hascode or bycrpt
const bcrypt=require('bcryptjs');

// generate token 
const jwt=require('jsonwebtoken');
// create new user
route.post('/register',async (req,res)=>{
    
    //checking user email id in database
    const emailExit=await User.findOne({
        email:req.body.email
    });

    // email are check
    if(emailExit) return res.status(400).send("Email are already exits");

    // hashpassword
    const salt=await bcrypt.genSalt(10);
    const hashedpassword=await bcrypt.hash(req.body.password,salt);

    //create new user
    const user=new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedpassword
        
    });

try
{
   const saveduser=await user.save();
   res.send(saveduser);
}
catch(error)
{
   res.status(400).send(error);
}
});

// user login
route.post('/login',async (req,res)=>{

    // checking user email id in databses
    const user=await User.findOne({
        email:req.body.email
    });

    if(!user) return res.status(400).send("Email are wrong");

    // checking password
    const validpass=await bcrypt.compare(req.body.password,user.password);

    //checking password
    if(!validpass) return res.status(400).send("Invalid password");

    // create token and assign token
    const token=jwt.sign({_id: user._id},process.env.TOKEN_SECRET);
    res.header("auth_token",token).send({token: token});

});

module.exports=route;