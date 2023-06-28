import {Router} from 'express';
import { sample_foods } from '../data';

import { FoodModel } from '../models/food.model';
import asyncHandler from 'express-async-handler';
const router = Router();


router.get("/seed", asyncHandler(
  async (req, res) => {           //async bcz Connection btw Datbase and our code is asynchronous
    //we can use then but it makes the code messy . async make code cleaner 
     const foodsCount = await FoodModel.countDocuments();
     if(foodsCount> 0){
       res.send("Seed is already done!");
       return;
     }
 
     await FoodModel.create(sample_foods);
     res.send("Seed Is Done!");
 }
 ))

 //Want to use database instead of data.ts 
   router.get("/", asyncHandler(async(req, res) => {   //await works when we have async at the beginning of the function
    //using async function directly results in inconsistent behaviour
    //so we put it inside asyncHandler
    const foods = await FoodModel.find()
        res.send(foods);
    })
  )

//get food via serchTerm
router.get("/search/:searchTerm",asyncHandler(async(req,res)=>{
  // console.log("req from serachTerm",req.params.searchTerm);
const searchRegex = new RegExp(req.params.searchTerm,'i');
const foods= await FoodModel.find({name: {$regex: searchRegex}})
  res.send(foods);
}
))
//get food by ID
router.get("/:foodId",asyncHandler(async(req,res)=>{
  const food = await FoodModel.findById(req.params.foodId);
   res.send(food);
}
))


export default router;

function asynceHandler(arg0: (req: any, res: any) => Promise<void>): import("express-serve-static-core").RequestHandler<{}, any, any, import("qs").ParsedQs, Record<string, any>> {
  throw new Error('Function not implemented.');
}
