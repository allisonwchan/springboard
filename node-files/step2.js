import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const fs = require('fs');
const process = require('process');
const axios = require('axios');

let cat = (path) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          process.exit(2);
        }
        console.log(data);
    });
}

async function webCat(url) {
    try {
        let resp = await axios.get(url);
        console.log(resp.data);
    } catch {
        console.error(`Error fetching ${url}`);
        process.exit(1);
    }
}


let path = process.argv[2];

if (path.slice(0, 4) === 'http') {
  webCat(path);
} else {
  cat(path);
}