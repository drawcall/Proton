const path = require("path");
const fs = require("fs-extra");
const { promisify } = require("util");

const fsCopy = promisify(fs.copy);
const fsRemove = promisify(fs.remove);
const fsReaddir = promisify(fs.readdir);

main();

async function main() {
  const list = await lsFile();
  await remove(list);
  await cp();
}

async function cp() {
  await fsCopy("./build", "../");
}

async function remove(list) {
  await fsRemove("../static");
  for (let i = 0; i < list.length; i++) {
    await fsRemove("../" + list[i]);
  }
}

async function lsFile() {
  const fileList = [];
  const files = await fsReaddir("../");

  files.forEach(file => {
    if (/^precache\-manifest.[0-9a-zA-Z]+/gi.test(file)) {
      fileList.push(file);
    }
  });
  fileList.push("asset-manifest.json");
  fileList.push("service-worker.js");

  return fileList;
}
