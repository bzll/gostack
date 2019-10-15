const express = require('express');
const server = express();

const projects = []

server.use(express.json());

let numberOfRequests = 0;

server.use((req, res, next) => {
  console.time('Request');
  console.log(`Metodo: ${req.method}; URL: ${req.url};`);
  next();                     // Libera a execucao dos metodos
  console.timeEnd('Request'); // Encerra o time
})

function logRequests(req, res, next) {
  numberOfRequests++;

  console.log(`Número de requisições: ${numberOfRequests}`);
  return next();
}



function checkProjectInArray(req, res, next) {
  const index = projects.findIndex(x => x.id === req.params.id);
  req.index = index;
  return req.index >= 0 ? next() : res.status(400).json({ error: "ID not found" });
};

server.post('/projects', (req, res) => {
  const { id, title } = req.body;
  const project = {
    id,
    title,
    tasks: []
  };
  projects.push(project);

  return res.json(projects)
});

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.put('/projects/:id', checkProjectInArray, (req, res) => {
  const { title } = req.body;

  projects[req.index].title = title;
  return res.json(projects);

});

server.delete('/projects/:id', checkProjectInArray, (req, res) => {
  projects.splice(req.index, 1)
  return res.send();
});

server.post('/projects/:id/tasks', checkProjectInArray, (req, res) => {
  const { title } = req.body;

  projects[req.index].tasks.push(title);

  return res.json(projects)
});

server.use(logRequests);
server.listen(3001);
