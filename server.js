// const brotli = require('brotli');
// const fs = require('fs');
// const zlib = require('zlib');

// const brotliSettings = {
//     extension: 'br',
//     skipLarger: true,
//     mode: 1, // 0 = generic, 1 = text, 2 = font (WOFF2)
//     quality: 10, // 0 - 11,
//     lgwin: 12 // default
// };

// var dirs = ['.'];

// dirs.forEach(dir => {
//     fs.readdirSync(dir).forEach(file => {
//         if (file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.html')) {
//             //console.log(file);
//             // brotli
//             const result = brotli.compress(fs.readFileSync(dir + '/' + file), brotliSettings);
//             fs.writeFileSync(dir + '/' + file + '.br', result);
//             // gzip
//             const fileContents = fs.createReadStream(dir + '/' + file);
//             const writeStream = fs.createWriteStream(dir + '/' + file + '.gz');
//             const zip = zlib.createGzip();
//             fileContents
//                 .pipe(zip)
//                 .on('error', err => console.error(err))
//                 .pipe(writeStream)
//                 .on('error', err => console.error(err));
//         }
//     })
// })



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