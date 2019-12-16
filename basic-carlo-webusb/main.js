const carlo = require("carlo");
const path = require("path");

var https = require('https');
var http = require('http');
var fs = require('fs');

(async () => {

var options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}
  const app = await carlo.launch(options);
  app.on("exit", () => process.exit());
  app.serveFolder(path.join(__dirname, "dist"));
  await app.load("index.html");
})();
