import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    avatar: {
      type: String, 
      default: "https://edutap.in/wp-content/uploads/2023/12/dummy-avatar-1.webp",
    },
    password: {
      type: String,
      required: true,
    },
    licenseNo: {
      type: String,
      required: true,
    },
    licenseExpiryDate: {
      type: Date,
      // required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);


userSchema.pre('save',async function(next){
      if(!this.isModified('password')){
        return next();
      }

      const salt = await bcrypt.genSalt(10)
      this.password = await bcrypt.hash(this.password, salt);
      next();
})



export const User = mongoose.model("User", userSchema);