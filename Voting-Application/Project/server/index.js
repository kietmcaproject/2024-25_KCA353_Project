const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const voteCountModel = require('./models/vote')
const EmployeeModel = require('./models/employee')

const app = express()
app.use(express.json())
app.use(cors())

try{
    // mongoose.connect('mongodb+srv://sattyam232106:Satyam7991@mycluster.pbqrk.mongodb.net/');
    mongoose.connect('mongodb://localhost:27017/employee');
    console.log("Mongodb connected");
    
}catch(e){
console.log(e,"Connection failed");

}



app.post('/Math', async(req,res)=>{
    console.log(req.body);
    try{
    const result = await voteCountModel.findOneAndUpdate(
        {}, 
        { $inc: { mathCount: 1 } },
        { new: true, upsert: true } 
      );
      console.log('Vote updated:', result)   
      res.status(200).json({ error: 'update vote sucess' });

}catch(err){

        console.error('Error updating vote:', err);
        res.status(500).json({ error: 'Failed to update vote' });
}
})
app.post('/Science', async(req,res)=>{
    console.log(req.body);
    try{
    const result = await voteCountModel.findOneAndUpdate(
        {}, 
        { $inc: { scienceCount: 1 } },
        { new: true, upsert: true } 
      );
      console.log('Vote updated:', result)   
      res.status(200).json({ error: 'update vote sucess' });

}catch(err){

        console.error('Error updating vote:', err);
        res.status(500).json({ error: 'Failed to update vote' });
}
})
app.post('/English', async(req,res)=>{
    console.log(req.body);
    try{
    const result = await voteCountModel.findOneAndUpdate(
        {}, 
        { $inc: { englishCount: 1 } },
        { new: true, upsert: true } 
      );
      console.log('Vote updated:', result)   
      res.status(200).json({ error: 'update vote sucess' });

}catch(err){

        console.error('Error updating vote:', err);
        res.status(500).json({ error: 'Failed to update vote' });
}
})
app.get('/Math',async(req,res)=>{
    try{
    const result = await voteCountModel.findOne();
    res.json(result)}
    catch(err){
        console.error('Error fetching vote:', err);
        res.status(500).json({ error: 'Failed to fetch vote' });
    }

})
app.get('/English',async(req,res)=>{
    try{
    const result = await voteCountModel.findOne();
    res.json(result)}
    catch(err){
        console.error('Error fetching vote:', err);
        res.status(500).json({ error: 'Failed to fetch vote' });
    }

})
app.get('/Science',async(req,res)=>{
    try{
    const result = await voteCountModel.findOne();
    res.json(result)}
    catch(err){
        console.error('Error fetching vote:', err);
        res.status(500).json({ error: 'Failed to fetch vote' });
    }

})



app.post('/Login', (req, res) =>{
    const {email, password} = req.body;
    EmployeeModel.findOne({email: email})
    .then(user =>{
        if(user){
            if(user.password === password){
                res.json( 'Login Successful')
            }else{
                res.json('Invalid Password')
            }
        }
        else{
            res.json('User does not exist')
        }
    })
})

app.post('/register',async(req, res)=>{
    await EmployeeModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))

})

app.listen(3001,()=>{
    console.log('Server running on port 3001')
})