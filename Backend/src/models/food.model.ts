//Food Model
/*Here for creating Mongoose model
inside typescript we need to
1)create and interface of that 
model for having the autocompletion 
2) Create schema 
3)create Model*/

import { Schema, model } from "mongoose";


export interface Food{
    id:string;  //for this we need Virtuals 
    name:string;
    price:number;
    tags:string[];
    favorite:boolean;
    stars:number;
    imageUrl:string;
    origins:string[];
    cookTime:string;
  }

  export const FoodSchema = new Schema<Food>(
    {
        name: {type: String , required:true},
        price: {type: Number , required:true},
        favorite: {type: Boolean , default:false},
        stars: {type: Number , required:true},
        imageUrl: {type: String , required:true},
        origins: {type: [String] , required:true},
        cookTime: {type: String , required:true},
        
    },{
        toJSON:{
            virtuals:true   /*virtuals are kind of values that will not saved
            on the database . They will be generated based on the values inside the database
            by default if virtuals to true mongoose wil set underline id to id*/
        },
        /*when you get the value from the database and wnat to work wih it 
        inside the code that is to object set its virtuals to true */
        toObject:{
            virtuals: true
        },
        /*to create and UPDATE pass the option of timestamps*/
        timestamps: true
    }
 
  );
  export const FoodModel = model<Food>('food', FoodSchema); 
  /*Name of the model inside the databasecall it food and the schema is FoodSchema
  we have our food model we can do all create read update and delete operation*/