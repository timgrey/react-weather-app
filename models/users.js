const mongoose = require ("mongoose")
const {Schema} = mongoose

const UserSchema = new Schema({
    username: {
        type: String,
        required:true
    },
    password:{ 
        type: String,
        required:true
    },
    homeWeather:{
        type: String,
        required:false
    }
})

module.exports = mongoose.model("User", UserSchema);