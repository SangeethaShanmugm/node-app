import { getPolls, getPollById, deletePollById, insertPoll, updatePollById, replacePollById} from "../helper.js";
import { createConnection } from '../expactive.js';
import { auth } from "../middleware/auth.js";
import jwt from 'jsonwebtoken';
import express from 'express';
import { getPolls } from "./helper.js";
const router = express.Router();

 
//poll routes
router.route("/").get(auth, async (request, response)=>{
    const client = await  createConnection();
    const poll = await getPolls(client, { });
    response.send(poll);
}).post(auth, async (request, response)=>{

    const client = await  createConnection();
    const poll = request.body;
   const polls = await insertPoll(client, poll);
    response.send(polls);
});

       //get data by id and delete by id + patch--update
router.route("/:id").get(auth, async (request, response)=>{
    const id=request.params.id;
    const client = await  createConnection();
   const poll = await getProductById(client, +id);
    response.send(poll);
    }).patch(auth, async (request, response)=>{
        const id=request.params.id;
        const newpoll = request.body;
        const client = await  createConnection();
       const poll = await updatePollById(client, +id, newpoll);
        response.send(poll);
    })
    .put(auth, async (request, response)=>{
            const id=request.params.id;
            const newpoll = request.body;
            const client = await  createConnection();
           const poll = await replacePollById(client, +id, newpoll);
            response.send(poll);
            })   
    
    .delete(auth, async (request, response)=>{
        const id=request.params.id;
       // const contestant= user.filter((data)=>data.id === id);
        // console.log(id, contestant);
       const client = await  createConnection();
       const poll = await deletePollById(client, +id);
        response.send(poll);
        });

//search by name

router.get( "/name/:pollname",auth, async (request, response)=>{
    const pollname= request.params.pollname;
    const client = await  createConnection();
   const polls = await getPolls(client, { poll : pollname});
    response.send(polls);
});

router.get( "/description/:search",auth, async (request, response)=>{
    const search = request.params.search;
    const client = await  createConnection();
   const polls = await getPolls(client, { description: { $regex: search, $options: "i" }, });
    response.send(polls);
});
 





export const pollRouter = router;