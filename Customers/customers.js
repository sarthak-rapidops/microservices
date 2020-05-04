const exprees = require('express')
const mongoose = require('mongoose')
const bodyparse = require('body-parser')
const Customer = require('./model/Customer')
const app = exprees()


app.use(bodyparse.json())

mongoose.connect("mongodb+srv://sarthak-rapidops:sarthak@rapidops-0d1fa.mongodb.net/Customerservice?retryWrites=true&w=majority",()=>{
    console.log("connected")
})

//create a new customer
app.post('/customer',(req, res)=>{
    const {name, age, address} = req.body
    const newCustomer = new Customer({
        name,
        age,
        address
    })                                           
    newCustomer.save()
    .then(()=>{
        console.log("new customer created")
    }).catch((err)=>{
        if(err) throw err;
    })
    res.send("successfully inserted...")
})

// get all customer 
app.get('/customer',(req, res)=>{
    Customer.find()
    .then((customer)=>{
        res.json(customer)
    })
    .catch((err)=>{
        if(err) throw err;
    })
})
 // get customer by its id
 app.get('/customer/:id',(req, res)=>{
    Customer.findById(req.params.id)
    .then((customer)=>{
        if(customer){
            res.json(customer)
        }else{
            res.status(200).json({message:"invalid ID"})
        }
        
    })
    .catch((err)=>{
        if(err) throw err;
    })
})

// delete book
app.delete("/customer/:id",(req, res)=>{
    Customer.findOneAndRemove(req.params.id)
    .then((customer)=>{
        if(customer){
            res.send("succesfully delete customer")
        }else{
            res.status(200).json({message:"Invalid ID"})
        }
        
    })
    .catch((err)=>{
        if(err) throw err;
    })
})
app.listen(4000,()=>{
    console.log("running on port 4000")
})