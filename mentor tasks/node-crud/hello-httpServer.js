var http = require("http");
var fs = require("fs");

const hostname = "127.0.0.1";
const port = "4000";

http
  .createServer(function (request, response) {
    //sending htttp header - status 200(OK) - type=text
    response.writeHead(200, { "Content-Type": "text/plain" });

    //sending response body
    response.end("Hello World");
  })
  .listen(port); //port no. for the server

console.log(`\nServer running at http://${hostname}:${port}/`);

fs.readFile("input.txt", function (err, data) {
  if (err) return console.error(err);
  console.log(data.toString() + "\n");
});

console.log("Program Ended");
