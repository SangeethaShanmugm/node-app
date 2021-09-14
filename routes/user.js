import { getProducts, getProductById, deleteProductById, insertProduct, insertUser, getUsers } from "../helper.js";
import bcrypt from 'bcrypt';
import { createConnection } from '../expactive.js';
import express from 'express';
const router = express.Router();

//get all users

router.route("/").get(async (request, response)=>{
    const client = await  createConnection();
    const products = await getUsers(client, {});
    response.send(products);
})


// username and password--create a user by POST
router.route("/signup").post(async (request, response)=>{
    const {username, password, avatar} = request.body;
    const client = await  createConnection();
    const hashedPassword = await genPassword(password);
    const newUser = await insertUser(client, {username: username,password: hashedPassword,avatar})
    console.log(hashedPassword, newUser);
    response.send(newUser);
});


async function genPassword(password){
    // const password = 'password@123';
    const salt = await bcrypt.genSalt(10); //More rounds more secure -downside it takes longtime - user will nt patient
    const hashedPassword  = await bcrypt.hash(password, salt);
     return hashedPassword;
}

      

export const userRouter = router;