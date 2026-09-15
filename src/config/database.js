const mongoose= require("mongoose")

function connectTodb(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("database is connect");
        
    })
}
module.exports=connectTodb