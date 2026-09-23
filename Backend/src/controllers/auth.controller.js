const jwt = require("jsonwebtoken")
const bcrypt= require("bcryptjs")
const usermodel = require("../model/note.model")



 async function registercontroller(req,res){
    const{email,username,password,bio,profileimg}= req.body
    const isuserAlreadyexist=await usermodel.findOne({
        $or:[
            {username},{email}
        ]
    })
    if (isuserAlreadyexist) {
        return res.status(409).json({
            message:"user already exist"+(isuserAlreadyexist.email)==email
             ?
            "email already exist":
            "username already exist"
        })
    }
    const hash =await bcrypt.hash(password,10)
const user  =await usermodel.create({
    username,
    password:hash,
    email,
    profileimg,bio
})
const token = jwt.sign({
    id:user._id,
    username:user.username
},
process.env.JWT_SECRET,
{expiresIn:"1d"}
)
res.cookie("token",token)
res.status(201).json({
    message:"User Register Succesfully",
    user:{
        email:user.email,
        username:user.username,
        bio:user.bio,
        profileimg:user.profileimg
    }
})
}

async function logincontroller(req,res){
const {email,password,username}=req.body
const user = await usermodel.findOne({
    $or:[
        {username:username}
        ,{
            email:email
        }
    ]
})
if (!user) {
    return res.status(404).json({
        message:"user is not found"
    })
}
const isPasswordValid=await bcrypt.compare(password,user.password)

if (!isPasswordValid) {
    return res.status(401).json({
        message:"invalid password"
    })
}
const token = jwt.sign({
    id:user._id,
    username:user.username
},
process.env.JWT_SECRET,{expiresIn:"1h"})
res.cookie("token",token)
res.status(200).json({
    message:"user is login succesfully",
    user:{
        username:user.username,
        email:user.email,
        bio:user.bio
    }
})
}

module.exports= {
    registercontroller,
    logincontroller
}