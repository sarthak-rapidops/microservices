const mongoose = require('mongoose')

module.exports= mongoose.model("Book",{
    title:{
        type: String,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    pages:{
        type:Number,
        require:false
    },
    publisher:{
        type:String,
        require:true   
    }
})