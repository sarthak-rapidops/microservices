const mongoose = require("mongoose")

module.exports=mongoose.model("Customer",{
    name:{
        type: String,
        require:true
    },
    age:{
        type:Number,
        require:true
    },
    address:{
        type:String,
        require:true
    }
})