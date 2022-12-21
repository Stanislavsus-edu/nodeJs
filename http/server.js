const http = require('http')
const dotenv = require('dotenv').config().parsed

const server = http.createServer()
const PORT = process.env.PORT || 3000;

const handler = (req, res) => {
  if (req.url == '/'){
    let body = '';
    req.on('data', (chunk) => {
      body += JSON.parse(chunk);
    });
    req.on('end', () => {
      const url = `${dotenv.API}?access_key=${dotenv.KEY}&query=${encodeURIComponent(body)}`
      const request = http.request(url);
      request.on('response', (response) => {
        let data = '';
        response.on('data', (chunk) => {
          data += Buffer.from(chunk)
        });
        response.on('end', () => {
          const result = JSON.parse(data);
          if (result.success === false){
            res.statusCode=500
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify( {error: result.error.info} ))
          }
          else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', 'true');
            res.setHeader('origin', '*');
            res.setHeader('allowMethods', ['POST']);
            console.log(data)
            res.end(data);
          }
        });
      });
      request.end();
    })
  }
  else{
    res.statusCode = 404
    res.end('This url does not exist')
  }
}


server.listen(PORT).on('error', err => console.error(err)).on('request', handler)
