const express = require("express");
const app = express();
const PORT=5000;

const poll=[
    {
     "company": "Apple",
     "color": "black",
     "content": "us company"
    },
    {
     "company": "Samsung",
     "color": "skyblue",
     "content": "china company"
    },
    {
     "company": "MI",
     "color": "orange",
     "content": " indian company"
    },
    {
     "company": "Oneplus",
     "color": "red",
     "content": "us company"
    },
    {
     "company": "Moto",
     "color": "grey",
     "content": "us company"
    },
    {
     "company": "Infinix",
     "color": "red",
     "content": "China based Company",
     "id": "NaN"
    }
   ]

app.get("/", (request, response)=>{
    response.send("Hello I am a Developer in Product based company");
    });

app.get("/poll", (request, response)=>{
        response.send(poll);
        });


    app.listen(PORT, () => console.log("The Server is started in", PORT));