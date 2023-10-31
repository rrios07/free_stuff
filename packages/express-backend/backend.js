// backend.js
import express from "express";
import cors from "cors";
import funcs from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.get('/users', (req, res) => {
    const username = req.query.username;
    const email = req.query.email;
    funcs.getUsers(username, email)
       .then((result)=> {
	  res.send(result);
       })
       .catch((error) => {
          console.log(error);
       })
});
    
app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    funcs.findUserById(id)
       .then((result) => {
          if (result) {
	     res.send(result);
          } else {
             res.status(404).send('Resource not found.');
          }
       })
       .catch((error) => {
          console.log(error);
       })
});


app.post('/users', (req, res) => {
    const userToAdd = req.body;
    console.log(userToAdd);
    funcs.addUser(userToAdd)
    .then((user)=>{
          res.status(201).send(JSON.stringify(user));
    })
    .catch((error) => {
       res.status(403).send('invalid email.');
       console.log(error);
    })
});


app.delete('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    funcs.deleteUserById(id)
    .then((result) => {
       if(result){
          res.status(204).send();
       }
       else{
          res.status(404).send('Resource not found.');
       }
    })
    .catch((error) => {
       console.log(error);
    })


});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});  
