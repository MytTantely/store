const fs = require('fs');
const path = './data/data_kv.json';
const AppError = require('./../exception/AppError');

// Print the file
function read(){
  let readStream = fs.createReadStream(path);
  readStream.pipe(process.stdout);
}

// Find a key
function find(key){
  console.debug(`Start searching the Key "${key}"` );
  let readStream = fs.createReadStream(path);
  readStream
  .on('data', function (chunk) {
    let jsonData = JSON.parse(chunk);

    let value = jsonData[key];
    
    if(value !== undefined){
      console.log(`{"${key}":${value}}`);
      readStream.destroy();
    }
    
  })
  .on('end', function () {
    throw new AppError(`Missing key: "${key}". The value is not retrieved!`);
  })
  .on('close', function (err) {
    console.debug('Stream has been destroyed and file has been closed');
  });
}

module.exports = {read, find}

