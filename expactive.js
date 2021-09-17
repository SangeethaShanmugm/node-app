import express from "express";
import {MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import cors from "cors";
import { getProducts, getProductById, deleteProductById, insertProduct } from "./helper.js";
import  { productRouter } from './routes/product.js';
import  { userRouter } from './routes/user.js';
dotenv.config();
//loaded in process.env

// const express = require("express");
// const { MongoClient } = require("mongodb");
const app = express();
const PORT = process.env.PORT;
//change port as well
app.use(express.json());
app.use(cors());

// const user=[
    
//         {
//          "createdAt": "2021-08-27T02:16:01.017Z",
//          "name": "Roger Bayer",
//          "avatar": "https://cdn.fakercloud.com/avatars/polarity_128.jpg",
//          "id": "1"
//         },
//         {
//          "createdAt": "2021-08-27T01:04:32.249Z",
//          "name": "Nellie Jenkins",
//          "avatar": "https://cdn.fakercloud.com/avatars/ecommerceil_128.jpg",
//          "id": "2"
//         },
//         {
//          "createdAt": "2021-08-26T17:21:02.859Z",
//          "name": "Hilda Harber",
//          "avatar": "https://cdn.fakercloud.com/avatars/eyronn_128.jpg",
//          "id": "3"
//         },
//         {
//          "createdAt": "2021-08-26T14:27:00.864Z",
//          "name": "Kelley Howe",
//          "avatar": "https://cdn.fakercloud.com/avatars/matthewkay__128.jpg",
//          "id": "4"
//         },
//         {
//          "createdAt": "2021-08-26T21:30:55.783Z",
//          "name": "Leigh Windler",
//          "avatar": "https://cdn.fakercloud.com/avatars/rohixx_128.jpg",
//          "id": "5"
//         },
//         {
//          "createdAt": "2021-08-26T18:32:52.316Z",
//          "name": "Lloyd Feeney",
//          "avatar": "https://cdn.fakercloud.com/avatars/mactopus_128.jpg",
//          "id": "6"
//         },
//         {
//          "createdAt": "2021-08-26T18:07:52.914Z",
//          "name": "Shawna Dickinson",
//          "avatar": "https://cdn.fakercloud.com/avatars/emmandenn_128.jpg",
//          "id": "7"
//         }
       
//    ]

const product = [
    {
     "image": "https://cdn.shopify.com/s/files/1/0084/7770/4252/products/TIM401_Kettle_BlackWEB_2048x.jpg?v=1599829777",
     "name": "Kettle",
     "price": 13,
     "description": "Black stove-top kettle",
     "id": "1"
    },
    {
     "image": "https://upload.wikimedia.org/wikipedia/en/f/fe/CharlotteWeb.png",
     "name": "charlotte's web",
     "price": 2.39,
     "description": "Book on grid systems",
     "id": "2"
    },
    {
     "image": "https://media.istockphoto.com/photos/close-up-of-steaming-cup-of-coffee-or-tea-on-vintage-table-early-on-picture-id1137365972?k=20&m=1137365972&s=612x612&w=0&h=_x7JXTfZoxVC9JCh5n2YqEzM7c5l171keV2qeOAcuYs=",
     "name": "Coffee",
     "price": 9,
     "description": "Whole bean espresso can",
     "id": "3"
    },
    {
     "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAUZN45_W5CemKuYnxPQU3SxQnwSg-Ds2oWg&usqp=CAU",
     "name": "Lamp",
     "price": 35,
     "description": "Wooden table lamp",
     "id": "4"
    },
    {
     "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdy8AnKyHEF4SOaJik-7-b3KqxEa_mE_WdgQ&usqp=CAU",
     "name": "Headphones",
     "price": 66,
     "description": "Seafoam wireless headphones",
     "id": "5"
    },
    {
     "image": "https://static.acer.com/up/Resource/Acer/Accessories/Predator/Predator_Rolltop_backpack/Photogallery/20170224/Predator-ROLLTOP-Backpack-gallery-01.png",
     "name": "Messenger bag",
     "price": 60,
     "description": "Black roll-top backpack",
     "id": "6"
    },
    {
     "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRij1y_rbUzVftz8uin5pzW0rCtnVMFujJu7g&usqp=CAU",
     "name": "Keyboard",
     "price": 85,
     "description": "Black magic keyboard",
     "id": "7"
    },
    {
     "image": "https://media.croma.com/image/upload/f_auto,q_auto,d_Croma%20Assets:no-product-image.jpg,h_260,w_260/v1605197520/Croma%20Assets/Computers%20Peripherals/Computer%20Accessories%20and%20Tablets%20Accessories/Images/8869676908574.png",
     "name": "Mouse",
     "price": 50,
     "description": "Apple Magic Mouse",
     "id": "8"
    },
    {
     "image": "data:image/jpeg;base64,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",
     "name": "Power of Subconscious mind",
     "price": 20,
     "description": "powerful force to be reckoned with",
     "id": "9"
    }
   ];
   

export async function createConnection(){
    const MONGO_URL = process.env.MONGO_URI;
    const client = new MongoClient(MONGO_URL) ;

    try{
        await client.connect();
        return client;
        // const result = await client .db("user").collection("userdata").insertMany(product);
        // getProductById(client, "4");
        
        
        console.log("Successfully Connected", result);
    }catch(err){
        console.log(err);
    }
    }

//      //insert values to db product
// async function insertProduct(client , product){
//     const result = await client.db("product").collection("productdbvalue").insertMany(product);

//     console.log(" Inserted successfully", result);
// }

//createConnection();

//Todo

app.get("/", (request, response)=>{
    response.send("Hello I am a Senior Developer in Google USA");
    });

app.use('/product', productRouter );

// '/product:id',
// '/product/name/:productname',
// '/product/description/:productdescription',


//user ---signup
app.use('/user', userRouter);


app.listen(PORT, () => console.log("The Server is started in", PORT));

// async function genPassword(password){
//     // const password = 'password@123';
//     const salt = await bcrypt.genSalt(10); //More rounds more secure -downside it takes longtime - user will nt patient
//     const hashedpassword  = await bcrypt.hash(password, salt);
//     console.log(hashedpassword);
// }
// genPassword("password@123");