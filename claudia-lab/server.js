'use strict';

//node modules
const http = require('http');
const url = require('url');
const queryString = require('querystring');

// npm modules
const cowsay = require('cowsay');

// app moduels
const parseBody = require('./lib/parsebody.js');

// module constats
const PORT = process.env.PORT || 3000;

//creates server and takes a callback that handles the request and sends a response
const server = http.createServer(function(req, res) {
  req.url = url.parse(req.url); //gets url
  req.url.query = queryString.parse(req.url.query); //gets query string

  if (req.url.pathname === '/') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello World');
    res.end();
    return;
  }

  if (req.method === 'GET' && req.url.pathname === '/cowsay') {
    if (req.url.query.text) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({text:req.url.query.text, f:req.url.query.f}));
      res.end();
    } else {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
      res.end();
    }
    return;
  }

  if (req.method === 'POST' && req.url.pathname === '/cowsay'){
    parseBody(req, function(err){
      if (err) return console.error(err);

      if (req.body.text) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(cowsay.say({text:req.body.text, f:req.url.body.text}));
        res.end();
      } else {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
        res.end();
      }
    });
    return;
  }
  res.writeHead(400, {'Content-Type': 'text/plain'});
  res.write(cowsay.say({text: 'Error! Try again!'}));
  res.end();
});

//callack triggered when server is listening
server.listen(PORT, function(){
  console.log('server listening', PORT);
});
