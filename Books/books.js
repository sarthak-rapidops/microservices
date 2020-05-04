const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const app = express();
const Book = require('./model/Book')
app.use(bodyparser.json())

// connect
mongoose.connect("mongodb+srv://sarthak-rapidops:sarthak@rapidops-0d1fa.mongodb.net/Bookservice?retryWrites=true&w=majority",()=>{
    console.log("connected")
})


app.get('/',(req, res)=>{
    res.send("welcome")
})

//create books
app.post('/book',(req, res)=>{
    const{title, author, pages, publisher} = req.body
    let newBook = new Book({
        title,
        author,
        pages,
        publisher 
    })                                           
    newBook.save()
    .then(()=>{
        console.log("new book created")
    }).catch((err)=>{
        if(err) throw err;
    })
    res.send("successfully inserted...")
})
// get all books
app.get('/book',(req, res)=>{
    Book.find()
    .then((books)=>{
        res.json(books)
    }).catch((err)=>{
        if(err) throw err;
    })
})


// get book by its id
app.get("/book/:id",(req, res)=>{
    Book.findById(req.params.id)
    .then((book)=>{
        if(book){
            res.json(book)
        } else{
            res.status(200).json({message:"invalid ID"})
        }
    })
    .catch((err)=>{
        if(err) throw err;
    })
})

// delete book
app.delete("/book/:id",(req, res)=>{
    Book.findOneAndRemove(req.params.id)
    .then((book)=>{
        if(book){
            res.send("succesfully delete book")
        }else{
            res.status(200).json({message:"Invalid ID"})
        }
        
    })
    .catch((err)=>{
        if(err) throw err;
    })
})



app.listen(3000,()=>{
    console.log("running on port 3000")
})