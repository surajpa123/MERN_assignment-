import { User } from "../models/User.model.js";
import bcrypt from "bcryptjs"
import  jwt  from "jsonwebtoken";

export const register = async (req,res)=>{

    const {name,email,password} = req.body;
    if([name, email, password].some((feild) => feild?.trim() === "")){
        return res.status(400).json({message:"Please fill all feilds"})
    };

    const existUser = await User.findOne({email});
    if(existUser){
        return res.status(400).json({message:"User already exist"})
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({name,email,password:hashedPassword});

    const createdUser = await User.findById(newUser._id).select("-password -role");

    if (!createdUser){
     return res.status(404).send("Error creating user");
    }

    res.status(200).json({
        sucess: true,
        message:"User created successfully",
        user:createdUser
    })

}


export const login = async (req,res)=>{

    const {email,password} = req.body;
    if([email, password].some((feild) => feild?.trim() === "")){
        return res.status(400).json({message:"Please fill all feilds"})
    };
    const user = await User.findOne({email})

    if(!user){
        return res.status(400).json({message:"User not found"})
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(400).json({message:"Invalid password"})
    };

    const token = jwt.sign({_id:user._id,role:user.role},process.env.SecretKey,{
        expiresIn:'2d'
    });


    const loggedUser = await User.findById(user._id).select("-password")


    res.status(200).json({
        sucess: true,
        message:"User logged in successfully",
        token,
        user:loggedUser
    });
}

