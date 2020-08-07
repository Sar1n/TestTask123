var express = require("express");
var app = express();
const compression = require('compression');
app.use(compression());

const path = require('path');

app.use(express.static(__dirname + '/dist/TestLogin'));


app.get('/*', function(req,res) {    
    res.sendFile(path.join(__dirname+'/dist/TestLogin/index.html'));
});

app.listen(process.env.PORT || 8080);