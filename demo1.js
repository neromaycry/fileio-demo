/**
 * 文本写入
 */

const fs = require('fs');
const dataStream = require('dataStream');

const path = __dirname + '/style.css';
const date = '/* @update: 2017-11-22 12:16:16 */\n';

let stream = new dataStream();

stream.on('complete', function (body) {
    fs.writeFile(path, date + body, function (err) {
        if(err) {
            console.error(err);
            } else {
               console.log('写入成功');
            }
    })
});

fs.createReadStream(path).pipe(stream);