import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const fs = require('fs');
const process = require('process');
const axios = require('axios');

// helper function for handling printing output or writing it to a file
let handleOutput = (text, out) => {
    if (out) {
        fs.writeFile(out, text, 'utf8', (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    } else {
        console.log(text);
    }
}

let cat = (path, out) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          process.exit(2);
        }
        handleOutput(data, out);
    });
}

async function webCat(url, out) {
    try {
        let resp = await axios.get(url);
        handleOutput(resp.data, out);
    } catch {
        console.error(`Error fetching ${url}`);
        process.exit(1);
    }
}


let path;
let out;

if (process.argv[2] === '--out') {
  out = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}

if (path.slice(0, 4) === 'http') {
  webCat(path, out);
} else {
  cat(path, out);
}