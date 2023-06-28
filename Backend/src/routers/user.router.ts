import {Router} from 'express';
import { sample_users } from '../data';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { User, UserModel } from '../models/user.model';
import bcrypt from 'bcryptjs';
const router = Router();

router.get("/seed", asyncHandler(
    async (_req, res) => {           //async bcz Connection btw Datbase and our code is asynchronous
      //we can use then but it makes the code messy . async make code cleaner 
       const UsersCount = await UserModel.countDocuments();
       if(UsersCount > 0){
         res.send("Seed is already done!");
         return;
       }
   
       await UserModel.create(sample_users);
       res.send("Seed Is Done!");
   }
   ))
   

//LOGIN API
router.post("/login",asyncHandler(
    async(req, res)=>{
     console.log("REQ from login ", req.body);
    const {email , password} = req.body;
    const user =await UserModel.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
        // res.send(generateTokenResponse(user))
        res.status(201).json({currUser: user,message:"Logged in"});

    }
    else{
        res.status(400).json({message:"User Name or Password is not Valid"});
    }
}))
// register
router.post('/register',asyncHandler(
    async(req,res)=>{
        console.log("User Registered",req.body);
        const {name, email,password, address} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            res.status(400)
            .send('User is already exist,please Login');
            return;
        }
        const encryptedPassword = await bcrypt.hash(password,10);
        const newUser:User = {
            id:'',
            name,
            email: email.toLowerCase(),
            password : encryptedPassword,
            address,
            isAdmin: false
        }

        const dbUser = await UserModel.create(newUser);
        res.status(201).json({dbUser});
        res.send(generateTokenResponse(dbUser));
    }
))
const generateTokenResponse = (user : User) => {
    const token = jwt.sign({
      id: user.id, email:user.email, isAdmin: user.isAdmin
    },process.env.JWT_SECRET!,{
      expiresIn:"30d"
    });
  
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      address: user.address,
      isAdmin: user.isAdmin,
      token: token
    };
  }

export default router;