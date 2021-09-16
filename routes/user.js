import { getProducts, getProductById, deleteProductById, insertProduct, insertUser, getUsers, getUser } from "../helper.js";
import { auth } from "../middleware/auth.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createConnection } from '../expactive.js';
import express from 'express';


const router = express.Router();

//get all users
//auth is middleware to protect our route
router.route("/").get(auth, async (request, response)=>{
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
    // response.send(newUser);
});

//login
router.route("/login").post(async (request, response)=>{
    const {username, password} = request.body;
    const client = await  createConnection();
    const user = await getUser(client, {username: username});
    console.log(user);
    const inDbStoredPassword = user.password;
    const isPasswordMatch = await  bcrypt.compare(password, inDbStoredPassword);
if(isPasswordMatch){
    //sign token
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY)
    response.send({message: 'Successful login', token: token});
}
else{
    response.send({message: 'Invalid login'});
}
  
});


async function genPassword(password){
    // const password = 'password@123';
    const salt = await bcrypt.genSalt(10); //More rounds more secure -downside it takes longtime - user will nt patient
    const hashedPassword  = await bcrypt.hash(password, salt);
     return hashedPassword;
}

      

export const userRouter = router;