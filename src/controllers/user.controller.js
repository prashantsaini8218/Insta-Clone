const { model } = require("mongoose")
const followmodel= require("../model/follow.model")
const usermodel = require("../model/note.model")




async function followUserControllers(req,res) {

    const followerusername  =req.user.username //ye uski id hai jo follow karega ye reg.body se aayeegi
    const followeeusername =  req.params.username //jisko follow kiya ja  raha hai or ye  yaha se aayegi userRouter.post("/follow/:username",identifyUser,usercontroller.followUserControllers )

if(followeeusername == followerusername){
     return res.status(400).json({
        message:"You cannot Follow Yourself"
     })
}

const isFolloweeExist = await usermodel.findOne({
    username:followeeusername
})
if(!isFolloweeExist){
    return res.status(404).json({
        message:"User you are trying to follow does not exist"
    })
}

const isAlreadyFollowing =await followmodel.findOne({
     follower:followerusername,
    followee:  followeeusername
}) 
if(isAlreadyFollowing){
    return res.status(200).json({
        message:`You are Already Following  ${followeeusername}` ,
        follow:isAlreadyFollowing
    })
}


const followRecord = await followmodel.create({
    follower:followerusername,
    followee:  followeeusername
})
res.status(201).json({
    message:`you are now following ${followeeusername}`,
    follow:followRecord
})
}
async function unfollowusercontroller(req,res) {
    const followerusername = req.user.username
    const followeeusername = req.params.username

    const isuserfollowing = await followmodel.findOne({
        follower:followerusername,
        followee:followeeusername
    })
    if(!isuserfollowing){
        return res.status(200).json({
            message:`you are not following ${followeeusername}`
        })
    }
    await followmodel.findByIdAndDelete(isuserfollowing._id)
    res.status(200).json({
        message:`you have unfollowed ${followeeusername}`
    })
}
async function acceptfollowcontroller(req,res) {
    const followerusername = req.params.username
    const followeeusername = req.user.username
    
// Kya Rahul ne Aman ko follow request bheji hui hai aur status pending hai?
    const followRequest = await followmodel.findOne({
        follower:follower,
        followee:followee,
        status:"pending"
    })
    // Agar request mili hi nahi
if (!followRequest) {
    return res.status(404).json({
        message:"follow request not found"
    })
}
followRequest.status="accept"
await followRequest.save()
res.status(200).json({
    message: `${follower} follow request accepted`
})
}

async function rejectFollowController(req, res) {

    const follower = req.params.username
    const followee = req.user.username

    const followRequest = await followmodel.findOne({
        follower: follower,
        followee: followee,
        status: "pending"
    })

    if (!followRequest) {
        return res.status(404).json({
            message: "Follow request not found"
        })
    }

    followRequest.status = "reject"

    await followRequest.save()

    res.status(200).json({
        message: `${follower} follow request rejected`
    })
}

module.exports= {followUserControllers,unfollowusercontroller,acceptfollowcontroller,rejectFollowController
}