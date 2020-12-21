const ob = require('./').s3RegisterToTreeView;
const fs = require('fs');

const fileInput = process.argv.length > 2 ? process.argv[2] : './AMAZON_S3_RESULTS.json';
var obj = JSON.parse(fs.readFileSync(fileInput));

console.log(ob(obj));