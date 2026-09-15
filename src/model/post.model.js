const mongoose = require("mongoose")
const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: "",
    },
    imgurl: {
        type: String,
        require: [true, "img_url is required for creating an post"]
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        require: [true, "user id is required for creating an post"]
    }
})

const postmodel = mongoose.model("post", postSchema)

module.exports = postmodel