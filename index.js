const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile')
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

const ZooRouter = require('express').Router();

server.use('api/zoos', ZooRouter)

// endpoints here

router.post('/', (req, res) => {
  db('')
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
