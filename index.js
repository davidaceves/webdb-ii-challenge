const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const router = require('express').Router();
const knexConfig = require('./knexfile')
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use('/api/zoos', router);
server.use(helmet());

// endpoints here

router.post('/', (req, res) => {
  const { name } = req.body;
  
  if (!name) {
    res.status(400).json({
      message: "Please provide a name for the zoo."
    })
    return;
  } 

  db.insert(req.body, ['id'])
    .into('zoos')
    .then(id => {
      res.status(201).json(id)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.get('/', (req, res) => {
  db('zoos')
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
