const fs = require("fs");
const path = require("path");

const src = './example';
const filesArr = [];

writePage();

// write content to html
function writePage() {
    readFiles(src);

    const page = src + '/index.html';
    fs.readFile(page, 'utf-8', (err, data) => {
        if (err) throw err;

        const content = getContent(data, filesArr);
        data = data.replace('<% code %>', content);

        fs.writeFile(page, data, (err) => {
            if (err) throw err;
            console.log('It\'s saved!');
        });
    });
}

function getContent(data, filesArr) {
    let content = ``;
    filesArr.forEach(val => {
        content += `<div>
                <a class="link" href="${val.path.replace('example/', '')}"><b></b>${val.parent} / ${val.filename}</a>
            </div>
            `;
    });

    return content;
}

// read all html file
function readFiles(src, parent) {
    const files = fs.readdirSync(src);

    files.forEach(function (filename) {
        const filepath = path.join(src, filename);
        const stats = fs.statSync(filepath);

        if (stats.isFile()) {
            if (/\.html$/.test(filename) && parent) {
                filesArr.push({
                    filename: filename,
                    path: filepath,
                    parent: parent
                });
            }
        } else if (stats.isDirectory()) {
            readFiles(filepath, filename);
        }
    });
} 