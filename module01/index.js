const express = require('express');

const server = express();

// Informo que o express receberá JSON
server.use(express.json());

const users = ['Ciroca','Claudio','Victor'];

//localhost:3000/teste

/*
Query Params = ?teste=1
Route Params = /users/1
Request Body = { "user" : "00003" , "email" : "xx@xxx.com"}

CRUD - Create, Read, Update and Delete

*/
// Query Params
server.get('/users', (req, res) => {
    return res.json(users);
})

// Route Params
server.get('/users/:index', (req, res) => {
    //const index = req.params.id;    
    const { index } = req.params;

    // return res.json({ message: `Searching for ${id}` });
    return res.json(users[index]);
})

server.post('/users', (req, res) => {
    const { name } = req.body;

    users.push(name);

    return res.json(users);
});

server.put('/users/:index', (req, res) => {
    const { name } = req.body;
    const { index } = req.params;

    users[index] = name;
    
    return res.json(users);

});

server.delete('/users/:index', (req, res) => {
    const { index } = req.params;

    users.splice(index, 1);

    return res.send();
})


server.listen(3000);