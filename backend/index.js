const http = require('http');
const app = require('./route/routes');

const port = process.env.port || 3001;

const server = http.createServer(app);

server.listen(port, ()=> {
  console.log(port);
});