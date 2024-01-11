
// import User from "../models/User.model.js"
import jwt from "jsonwebtoken";

const AuthmiddleWare = async (req, res, next) =>{

    try {

        const token = req.headers.authorization;
        if(!token){
            return res.status(401).json({message:"No token provided"})
        }
    
        jwt.verify(token,process.env.SecretKey,(err,decoded)=>{
            if(err){
                return res.status(401).json({message:"Invalid token"})
            }
            req.user = decoded;
            next();
        })
        
    } catch (error) {

        console.log(error);
        next();
        
    }
   
}

export default AuthmiddleWare;