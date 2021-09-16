import { getProducts, getProductById, deleteProductById, insertProduct } from "../helper.js";
import { createConnection } from '../expactive.js';
import { auth } from "../middleware/auth.js";
import jwt from 'jsonwebtoken';
import express from 'express';
const router = express.Router();

//app - router and removed product word (we know that when productRouter it starts with product)

// router.get("/", async (request, response)=>{
//     const client = await  createConnection();
//    const products = await getProducts(client, { });
//     response.send(products);
// });


// //POST method

// router.post("/", async (request, response)=>{

//     const client = await  createConnection();
//     const product = request.body;
//    const products = await insertProduct(client, product);
//     response.send(products);
// });

//taking commonality from both the path "/" and setting route------------------------

router.route("/").get(auth, async (request, response)=>{
    const client = await  createConnection();
    const products = await getProducts(client, { });
    response.send(products);
}).post(auth, async (request, response)=>{

    const client = await  createConnection();
    const product = request.body;
   const products = await insertProduct(client, product);
    response.send(products);
});

       //get data by id and delete by id + patch--update
router.route("/:id").get(auth, async (request, response)=>{
    const id=request.params.id;
    const client = await  createConnection();
   const product = await getProductById(client, +id);
    response.send(product);
    }).patch(auth, async (request, response)=>{
        const id=request.params.id;
        const client = await  createConnection();
       const product = await updateProductById(client, +id);
        response.send(product);
        })
    
    .delete(auth, async (request, response)=>{
        const id=request.params.id;
       // const contestant= user.filter((data)=>data.id === id);
        // console.log(id, contestant);
       const client = await  createConnection();
       const product = await deleteProductById(client, +id);
        response.send(product);
        });

//search by name

router.get( "/name/:productname",auth, async (request, response)=>{
    const productname= request.params.productname;
    const client = await  createConnection();
   const products = await getProducts(client, { product : productname});
    response.send(products);
});

router.get( "/description/:search",auth, async (request, response)=>{
    const search = request.params.search;
    const client = await  createConnection();
   const products = await getProducts(client, { description: { $regex: search, $options: "i" }, });
    response.send(products);
});
 


export const productRouter = router;