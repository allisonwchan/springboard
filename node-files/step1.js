import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const fs = require('fs');
const process = require('process');

let cat = (path) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          process.exit(2);
        }
        console.log(data);
    });
}

cat(process.argv[2]);