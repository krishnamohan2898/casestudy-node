const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const {moviModel} = require('./model')

//ini
let app = express()
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())


//CORS POLICY

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET','POST')
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials',true)
    next()
    

})


//dbconnection

mongoose.connect("mongodb+srv://kmohan:krishnamohan@cluster0.7wvt2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority") 

//routes
app.get('/',(req,res)=>{
    res.send('WELCOME TO MOVIES APP')
})

app.post('/add',async(req,res)=>{
    try{
        console.log(req.body)
    let todo = new moviModel(req.body)
    let result = await todo.save()
    res.json(result)
    }
    catch(error){
        res.status(500).send(error)
    }
})

app.get('/displayall',async(req,res)=>{
    try{
        var result = await moviModel.find()
        res.json(result)
    }
    catch(error){
        res.status(500).send(error)
    }
})

app.post('/search',async(req,res)=>{
  
    try{
            var result = await moviModel.find({"moviename":{$regex:'.*'+req.body.moviename+'.*'}})
            res.json(result)
    }
    catch(error){
        res.status(500).send(error)

    }
})

app.post('/delete',async(req,res)=>{
    try{
        var result = await moviModel.findByIdAndDelete(req.body)
        res.json({"status":"deleted successfully"})
    }
    catch(error){
        res.status(500).send(error)
    }
})

app.post('/update',async(req,res)=>{
    try{
        var result = await moviModel.findByIdAndUpdate(req.body._id,req.body)
        res.json({"status":"updated successfully"})
    }
    catch(error){
        res.status(500).send(error)
    }
})

//hosting

app.listen(5000,()=>{
    console.log('running')
})