const express= require("express")
const usercontroller = require("../controllers/user.controller")
const identifyUser = require("../middlewares/auth.middleware")

const userRouter  =express.Router()


userRouter.post("/follow/:username",identifyUser,usercontroller.followUserControllers )

userRouter.post("/unfollow/:username", identifyUser, usercontroller.unfollowusercontroller)

userRouter.post("/accept/:username",identifyUser,usercontroller.acceptfollowcontroller)

userRouter.post("/reject/:username",identifyUser,usercontroller.rejectFollowController)

module.exports = userRouter;