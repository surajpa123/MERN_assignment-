import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 3,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
   password:{
    type: String,
    required: true
   },
  role: {
    type: String,
    enum: ['user','merchant'],
    default:"user"
  },
},{
    timestamps: true
});


export const User = mongoose.model("User", userSchema);
