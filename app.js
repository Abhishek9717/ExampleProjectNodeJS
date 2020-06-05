const express = require('express')
const http = require('http')
const ping = require('./routes/ping')
const posts = require('./routes/posts')
const nodemon = require('nodemon')
const app  = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/ping', ping);
app.use('/api/posts', posts);

server.listen(process.env.PORT|| 3000,(err)=>{
    if(!err){
        console.log("Server is up") 
    }
    else{
        console.log("Error creating server")
    }
})