const querystring = require('querystring');
const { TodoService } = require('./todo');

const http = require('http');
const port = 3000;

const services = { todo_service: new TodoService() };

const requestHandler = (request, response) => {
  console.log('result', request);

  try {
    console.log(request.url);

    const [path, props] = request.url.split('?');
    let pathSplit = path.split('/');
    let serviceName = pathSplit[1];
    let requestName = pathSplit[2];

    let result = services[serviceName].requests[requestName](
      querystring.parse(props)
    );

    console.log(path.split('/'), result);

    response.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'X-PINGOTHER, Content-Type',
    });
    response.end(JSON.stringify(result));
  } catch (e) {
    console.log(e);

    response.writeHead(500, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'X-PINGOTHER, Content-Type',
    });
    response.end('Error', e);
  }
};

const server = http.createServer(requestHandler);
server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`server is listening on ${port}`);
});
