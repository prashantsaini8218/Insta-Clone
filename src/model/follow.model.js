const mongoose = require("mongoose")
const followSchema  = new mongoose.Schema({
    follower:{
       type:String,
    },
      followee:{
      type:String,
    },
    status:{
        type:String,
        default:"pending",
        enum:{
            values:["pending","accept","reject"],
            message:"status can only be pending, accept or reject"
        }
    }
    

},{
    timestamps:true
})
// followSchema.index({follower:1 , followee:1 },{unique:true})   ye jo follower or followee ka combination hai ye dobara kahi bhi create nahi hona chaiye  
const followmodel = mongoose.model("follow",followSchema)
module.exports = followmodel