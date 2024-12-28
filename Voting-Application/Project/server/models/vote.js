const mongoose =require('mongoose');

const voteCountSchema=new mongoose.Schema({

mathCount:{
    type:Number,
    required:true
},
englishCount:{
    type:Number,
    required:true
},
scienceCount:{
    type:Number,
    required:true
}

})
const voteCountModel= mongoose.model('voteCount',voteCountSchema);
module.exports = voteCountModel;