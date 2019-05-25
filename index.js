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
  
  db.insert(req.body, 'id')
    .into('zoos')
    .then(res => {
      res.status(201).json(res)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
