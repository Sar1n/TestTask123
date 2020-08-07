// var gzipStatic = require('connect-gzip-static');
// var oneDay = 86400000;

// connect()
//   .use(gzipStatic(__dirname + '/dist/TestLogin'))

// connect()
//   .use(gzipStatic(__dirname + '/dist/TestLogin', { maxAge: oneDay }))


const brotli = require('brotli');
const fs = require('fs');
const zlib = require('zlib');

const brotliSettings = {
    extension: 'br',
    skipLarger: true,
    mode: 1, // 0 = generic, 1 = text, 2 = font (WOFF2)
    quality: 10, // 0 - 11,
    lgwin: 12 // default
};

var dirs = ['.'];

dirs.forEach(dir => {
    fs.readdirSync(dir).forEach(file => {
        if (file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.html')) {
            console.log(file);
            // brotli
            const result = brotli.compress(fs.readFileSync(dir + '/' + file), brotliSettings);
            fs.writeFileSync(dir + '/' + file + '.br', result);
            // gzip
            const fileContents = fs.createReadStream(dir + '/' + file);
            const writeStream = fs.createWriteStream(dir + '/' + file + '.gz');
            const zip = zlib.createGzip();
            fileContents
                .pipe(zip)
                .on('error', err => console.error(err))
                .pipe(writeStream)
                .on('error', err => console.error(err));
        }
    })
})



var express = require("express");
var expressStaticGzip = require("express-static-gzip");
var app = express();
app.use("/", expressStaticGzip("/dist/TestLogin"));



//Install express server
// const express = require('express');
const path = require('path');
// const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/TestLogin'));

var compress = require('compression');
app.use(compression());

app.get('/*', function(req,res) {    
    res.sendFile(path.join(__dirname+'/dist/TestLogin/index.html'));
});


// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);