const express = require("express")
const bodyparse = require("body-parser")
const mongoose = require('mongoose')
const Order = require("./model/Order")
const axios = require('axios')
const app = express();

app.use(bodyparse.json())

mongoose.connect("mongodb+srv://sarthak-rapidops:sarthak@rapidops-0d1fa.mongodb.net/Orderservice?retryWrites=true&w=majority",()=>{
    console.log("connected")
})

//create a new order
app.post("/order",(req, res)=>{
    const{CustomerId, BookId, initialDate, deliveryDate}= req.body
    const newOrder = new Order({
        CustomerId:mongoose.Types.ObjectId(CustomerId),
        BookId:mongoose.Types.ObjectId(BookId),
        initialDate,
        deliveryDate
    })
    newOrder.save()
    .then(()=>{
        res.send("order succesfully placed")
    })
})

app.get('/order',(req, res)=>{
    Order.find()
    .then((order)=>{
        res.json(order)
    })
    .catch((err)=>{
        if(err) throw err;
    })
})


// display order details in which its show customer name and book title
// for get these details you need to run all server like book server customer server and also order server
app.get('/order/:id',(req, res)=>{
    Order.findById(req.params.id)
    .then((order)=>{
        if(order){
            axios.get("http://localhost:4000/customer/" + order.CustomerId)
            .then((response)=>{
                const orderObject= {customerName: response.data.name, bookTitle:""}
                axios.get("http://localhost:3000/book/" + order.BookId)
                .then((response)=>{
                        orderObject.bookTitle = response.data.title
                        res.json(orderObject)
                })  
            })
        }else{
            res.status
        }
    })
})

app.listen(5000,()=>{
    console.log("running on 6000")
})