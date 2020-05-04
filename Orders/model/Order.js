const mongoose = require('mongoose')
module.exports = mongoose.model("Order",{
    CustomerId:{
        type:mongoose.Schema.ObjectId,
        require:true
    },
    BookId:{
        type:mongoose.Schema.ObjectId,
        require:true
    },
    initialDate:{
        type:Date,
        require:true
    },
    deliveryDate:{
        type:Date,
        require:true
    }
})