const express=require('express')
const mongoose=require('mongoose')
const cors =require('cors')
const bodyparser=require('body-parser')
const usermodel=require('./model/usermodel');
const itemmodel=require('./model/itemmodel');

const app=express();
app.use(bodyparser.json({limit:'10mb'}))
app.use(bodyparser.json({extended:true,limit:"10mb"}))
app.use(cors());
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/imagestorage').then((res)=>{
    console.log("mongoose connected successfully")
}).catch(err=>{
    console.log(err)
})


app.post('/setuser',(req,res)=>{
    usermodel.create(req.body).then(user=>{
        res.json(user)
    }).catch(err=>{
        res.json(err)
    })
})

app.post('/checkuser',(req,res)=>{
    const {email,password}=req.body
    usermodel.findOne({email:email}).then(user=>{
       res.json(user)
    }).catch(err=>{
        res.json(err)
    })
})

app.post('/upload',(req,res)=>{
    itemmodel.create(req.body).then(item=>{
        res.json(item)
    }).catch(err=>{
        res.json(err)
    })
})

app.get('/getitem',(req,res)=>{
    const {useremail}=req.query;
    itemmodel.find({useremail:useremail}).then(item=>{
        res.json(item)
    }).catch(err=>{
        res.json(err)
    })
})

app.listen(8000,()=>{
    console.log("app is running on port 8000")
})
