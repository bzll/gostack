const express = require('express');
const server = express();

// Informo que o express receberá body somente em JSON
server.use(express.json());

const users = ['Ciroca', 'Claudio', 'Victor'];

// Middleware global - logs
server.use((req, res, next) => {
    console.time('Request');    // Starta o time
    console.log(`Metodo: ${req.method}; URL: ${req.url};`);
    next();                     // Libera a execucao dos metodos
    console.timeEnd('Request'); // Encerra o time
});

// Middlewares - validacoes
function checkUserExists(req, res, next) {
    if (!req.body.name) {
        return res.status(400).json({ error: "User name is required" });
    }
    return next();
};

function checkUserInArray(req, res, next) {
    const user = users[req.params.index];
    if (!users[req.params.index]) {
        return res.status(400).json({ error: "User does not exists" });
    }
    req.user = user;
    return next();
}

server.get('/users', (req, res) => {
    return res.json(users);
});

// Route Params
server.get('/users/:index', checkUserInArray, (req, res) => {
    return res.json(req.user);
});
server.delete('/users/:index', checkUserInArray, (req, res) => {
    const { index } = req.params;

    users.splice(index, 1);

    return res.send();
})

// Route Params + Body JSON
server.put('/users/:index', checkUserExists, checkUserInArray, (req, res) => {
    const { name } = req.body;
    const { index } = req.params;
    users[index] = name;
    return res.json(users);

});

// Body JSON
server.post('/users', checkUserExists, (req, res) => {
    const { name } = req.body;
    users.push(name);
    return res.json(users);
});


//localhost:3000/teste
server.listen(3000);