const express = require('express'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      Message = require('./models/Message'),
      Product = require('./models/Product'),
      path = require('path');
      app  = express();
      require('dotenv').config()

mongoose.connect(`mongodb+srv://abhi:${process.env.DB_PASS}@cluster0.ddjzu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true 
}).then(()=>{
    console.log('DATABASE CONNECTED')
}).catch((err)=>{
    console.log('DATABASE NOT CONNECTED')
})

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


//ROUTES

app.get('/', (req, res)=>{
    res.status(200).send('WELCOME MASTER!!')
})

app.get('/api/products', async(req, res)=>{
    await Product.find({}).then((result)=>{
        res.status(200).json(result)
    }).catch((err)=>{
        res.status(400).json(err.message)
    })
})

app.post('/api/message', async(req, res)=>{
    try{
        res.status(200).json(await new Message(req.body).save())
    }catch(err){
        res.status(400).json({error: 'Details you filled were not correct!!'})
    } 
})

app.listen(process.env.PORT, (err)=>{
    if (err) throw err;
    console.log('BIGBERRY SERVER STARTED!!')
})