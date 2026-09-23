const mongoose =require("mongoose")
const noteSchema =new mongoose.Schema({
    username:{
              type:String,
              unique:[true,"user name is already exist"],
              required:[true,"user name is required"]},
    email:{
              type:String,
              unique:[true,"This email is already exist"],
              required:[true,"user name is required"]
    },
    password:{
              type:String,
             required:[true,"Password is required"],
    },
       bio:String,


profileimg:{
             type:String,
            default:"https://ik.imagekit.io/8g1z1ualt/instauser.jpeg?updatedAt=1789048243113"
}
   
}
)

const usermodel = mongoose.model("user",noteSchema)
module.exports= usermodel