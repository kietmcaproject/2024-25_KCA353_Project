
import express from 'express';
import User from '../model/auth.model.js';
const router = express.Router();
import PostQuiz  from '../model/quizdatamodel.js';

router.get("/",async(req,res)=>{
    try{
const Postquizdata=await PostQuiz.find().lean().exec()
res.send(Postquizdata)
    }catch(err){
return res.status(500).send(err.message)
    }
})

export default router;