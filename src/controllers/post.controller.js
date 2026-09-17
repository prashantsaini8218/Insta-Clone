const postmodel = require("../model/post.model")

const Imagekit= require("@imagekit/nodejs")
const {toFile}=require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")
const imagekit= Imagekit({
    privatekey:process.env.IMAGEKIT_PRIVATE_KEY
})

async function createpostcontroller(req,res) {




const file =await imagekit.files.upload({
    file:await toFile(Buffer.from(req.file.buffer),'file'),
    fileName:"Test"
    // folder:"Cohort2.0_insta_clonePost"
})


const post = await postmodel.create({
    caption:req.body.caption,
    imgurl:file.url,
    user:req.user.id
})

res.status(201).json({
    message:"Post created successfully",
    post
})

}


async function getpostcontroller(req,res) {

    const userid=  req.user.id
    const posts = await postmodel.find({
        user:userid
    })
    res.status(200).json({
        message:"post fetched succesfully",
        posts
    })
}


async function  getpostdetailscontroller(req,res) {
  
    const userid = req.user.id
    const postid = req.params.postid

    const post = await postmodel.findById(postid)
    if (!post) {
        return res.status(404).json({
            message:"Post not found."
        })
    }
    const isValiduser= post.user.toString()===userid
    if (!isValiduser) {
        return res.status(403).json({
            message:"Forbidden content"
        })
    }
    return res.status(200).json({
        message:"Post Fetche successfully"
    })
}
module.exports = {
    createpostcontroller,
    getpostcontroller,
    getpostdetailscontroller
}