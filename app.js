const http = require('http');
const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require("body-parser")

app.set('port', process.env.PORT || 2020);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.axios = axios;

require('./routes/router')(app);
http.createServer(app).listen(app.get('port'), function() {
  console.log('MOE系统已在 ' + app.get('port') + '上启动！');
});
