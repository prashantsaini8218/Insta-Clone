const express = require("express")
const postrouter = express.Router()
const postcontrollers  =require("../controllers/post.controller")
const multer = require("multer")
const upload= multer({storage:multer.memoryStorage()})
const identifyUser = require ("../middlewares/auth.middleware")


postrouter.post("/",upload.single("image"),identifyUser,postcontrollers.createpostcontroller)


// Get Api protected 
// is api par jo bhi user request karega uski saari post ye usko de dega yahi is api ka kaam hai 
postrouter.get("/",identifyUser,postcontrollers.getpostcontroller)



postrouter.get("/deatil/:postid",identifyUser,postcontrollers.getpostdetailscontroller)


module.exports=postrouter