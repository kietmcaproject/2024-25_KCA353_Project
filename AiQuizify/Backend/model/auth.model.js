import mongoose from 'mongoose';

// Define the quizAttempted schema
// const quizAttemptedSchema = new mongoose.Schema({
//   quizId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   quizResult: [],
// });

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    name:{
      type:String,
      required:true,
  },

  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true,
  },
  Points: Number,
  // quizAttempted: [quizAttemptedSchema],
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model as default
export default User;
