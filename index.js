const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()
const port = process.env.PORT || 5501
const cors = require('cors')
const bodyParser = require('body-parser')

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3be27.mongodb.net/${process.env.DB_name}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


app.use(cors())
app.use(bodyParser.json())
app.get('/', (req, res) => res.send('Hello World! how are you'))



client.connect(err => {
  const collection = client.db("martdb").collection("grocery");
  const clientInfo = client.db("martdb").collection("order");

    app.get('/orderHistory',(req,res)=>{
        clientInfo.find({}) 
        .toArray((err,documents)=>{
            res.send(documents)
        })
    })
    app.post('/orderDetails',(req,res)=>{
        const orderData = req.body ;
        clientInfo.insertOne(orderData)
        .then(result=>{
            res.send(result.insertedCount>0)
        })
    })
    app.get('/findProduct/:id',(req,res)=>{
        const item = ObjectId(req.params.id);
        collection.find({_id : item})
        .toArray((err,documents)=>{
            res.send(documents[0])
        })
    })
    app.get('/showProduct',(req,res)=>{
        collection.find({})
        .toArray((err,documents)=>{
            res.send(documents)
        })
    })
    app.post('/addProduct',(req,res)=>{
        const productData = req.body;
        collection.insertOne(productData)
        .then(result=>{
            res.send(result.insertedCount>0)
        })
    })


  console.log('Database connected successfully')
});



app.listen(port, () => console.log(`Example app listening on port port!`))