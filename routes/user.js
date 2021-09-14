import { getProducts, getProductById, deleteProductById, insertProduct } from "../helper.js";
import bcrypt from 'bcrypt';
import { createConnection } from '../expactive.js';
import express from 'express';
const router = express.Router();

// username and password--create a user by POST
router.route("/signup").post(async (request, response)=>{
    const {username, password} = request.body;
    const client = await  createConnection();
    const hashedPassword = await genPassword(password);
    console.log(hashedPassword);
    response.send(hashedPassword);
});


async function genPassword(password){
    // const password = 'password@123';
    const salt = await bcrypt.genSalt(10); //More rounds more secure -downside it takes longtime - user will nt patient
    const hashedPassword  = await bcrypt.hash(password, salt);
     return hashedPassword;
}

      

export const userRouter = router;