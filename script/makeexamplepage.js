const fs = require("fs");
const path = require("path");

const src = "./example";
const filesArr = [];

// write content to html
function writePage() {
  readFiles(src);

  const page = src + "/index.html";
  const content = getContent(filesArr);
  const data = template.replace("<% code %>", content);

  fs.writeFile(page, data, err => {
    if (err) throw err;
    console.log("It's saved!");
  });
}

function getContent(filesArr) {
  let content = ``;
  filesArr.forEach(val => {
    content += `<div>
                <a class="link" href="${val.path}"><b></b>${val.parent} / ${val.filename}</a>
            </div>
            `;
  });

  return content;
}

// read all html file
function readFiles(src, parent) {
  const files = fs.readdirSync(src);

  files.forEach(function(filename) {
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

const template = `
<!DOCTYPE html>
<html>
  <head>
    <title>proton.js / examples</title>
    <meta name="viewport" id="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
    <meta charset="utf-8" />
    <style type="text/css">
    body{background-color:#fafafa;margin:0;color:#555;font-family:"inconsolata";font-size:15px;line-height:18px}h1{margin-top:30px;margin-bottom:40px;margin-left:20px;font-size:25px;font-weight:normal}h2{font-size:20px;font-weight:normal}a{color:#2194ce;text-decoration:none}.container{margin:20px;margin-bottom:40px}.container>div{margin-bottom:3px}.link{color:#2194ce;text-decoration:none;cursor:pointer;display:block}.link:hover{text-decoration:underline}
    </style>
  </head>
  <body>
    <h1>Proton / example</h1>
    <div class="container">
      <% code %>
    </div>
  </body>
</html>
`;

writePage();
