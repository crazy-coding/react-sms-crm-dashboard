var path = require('path');
var express = require('express');
//console.log("Env is",process.env);
const port = 5001;
const app = express();
let env = process.env; //UIENV comes when run through webpack
const staticPath = path.join(__dirname, './build/');
app.use(express.static(staticPath));
const ROUTE_ASSET = process.env.ROUTE_ASSET || 'sendplex'
app.get("*.css", (req, res, next) => {
  res.sendFile(path.join(__dirname, `./build/${ROUTE_ASSET}`+req.url));
});
app.get("*.js", (req, res, next) => {
  res.sendFile(path.join(__dirname, `./build/${ROUTE_ASSET}`+req.url));
});

app.get('*', function response(req, res) {
  //console.log(`${req.url}.gz`);
  res.sendFile(path.join(__dirname, './build/index.html'));
});

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎  Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
