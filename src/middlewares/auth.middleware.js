// request kis user ne ki haqi


const jwt = require("jsonwebtoken")                                                                                                      

async function identifyUser(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "token not provided, Unauthorized access"
        })
    }
    let decoded = null
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)

    }
    catch (err) {
        return res.status(401).json({
            message: "user not authorized"
        })
    }
req.user=decoded   //user ki jagah kuch bhi likh sakte hai ye ek property hai
next()  // next method middleware se req aage bhejta hai
} 
 module.exports = identifyUser