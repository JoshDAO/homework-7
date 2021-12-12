const express = require('express');
const IPFS = require('ipfs');
var cors = require('cors');
let bodyparser = require('body-parser');
const all = require('it-all');
let jsonParser = bodyparser.json();

const app = express();
const port = 3001;
app.use(cors());

app.get('/hello', (req, res) => {
  res.send('hello, world!');
});

app.post('/upload', jsonParser, async (req, res) => {
  // Initialise IPFS node
  const node = await IPFS.create();
  // Set some data to a variable
  const data = `Hello, ${req.body.name}`;
  // Submit data to the network
  const cid = await node.add(data);
  // Log CID to console
  console.log(cid.path);

  res.json(cid.path);
});

app.get('/download/:cid', async (req, res) => {
  const cid = req.params.cid;

  // Initialise IPFS node
  const node = await IPFS.create();
  // Store CID in a variable
  // const cid = 'QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A';
  // Retrieve data from CID
  const data = Buffer.concat(await all(node.cat(cid)));
  // Print data to console
  console.log(data.toString());

  res.json(data.toString());
});

app.listen(port, () => {
  console.log(`Server is live at port ${port}`);
});
