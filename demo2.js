/**
 * 判断两个文件是否相同
 */

const fs = require('fs');
const md5 = require('md5');
const _ = require('underscore');

let path1 = __dirname + '\\testdir1\\',
    path2 = __dirname + '\\testdir2\\';

let filelist1 = fs.readdirSync(path1);

// console.log(filelist1);

fs.readdir(path2, function (err, files) {
    if (err) {
        console.log(err);
        return;
    }
    let i = filelist1.length;

    while (i--) {
        let isContain = _.contains(files, filelist1[i]);

        if (!isContain) {
            try {
                let buf = fs.readFileSync(path1 + filelist1[i]);
                fs.writeFileSync(path2 + filelist1[i], buf);
                console.log('已增加文件：', path2 + filelist1[i]);
            } catch (e) {
                console.error(e);
            }
        } else {
            for (let k = 0, len = files.length; k < len; k++) {
                if (filelist1[i] == files[k]) {
                    try {
                        let file1 = fs.readFileSync(path1 + filelist1[i]),
                            file2 = fs.readFileSync(path2 + files[k]);
                        if (md5(file1) != md5(file2)) {
                            fs.writeFileSync(path2 + files[k], file1);
                            console.log('已替换文件：', path2 + files[k]);
                        }
                    } catch (e) {
                        console.error(e);
                    }
                }
            }
        }
    }

});

