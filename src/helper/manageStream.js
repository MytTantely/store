const fs = require('fs');
const path = './data/data_kv.json';
const AppError = require('./../exception/AppError');

// Save
function save(key, value){
  console.debug(`Start saving "${key}":"${value}"`);

  let readStream = fs.createReadStream(path);
  let buffers = [];
  readStream
  .on('data', (chunk)=>{
      buffers.push(chunk);
    }
  )

  .on('end', ()=>{
      let jsonData = JSON.parse(Buffer.concat(buffers).toString());
      jsonData[key] = value;
      write(jsonData)
  });
}

// Delete
function remove(key){
  console.debug(`Start deleting "${key}"`);

  let readStream = fs.createReadStream(path);
  let buffers = [];
  readStream
  .on('data', (chunk)=>{
      buffers.push(chunk);
    }
  )

  .on('end', ()=>{
      let jsonData = JSON.parse(Buffer.concat(buffers).toString());
      delete jsonData[key];
      write(jsonData)
  });
}

function write(data){
  let wstream = fs.createWriteStream(path);
  wstream.write(JSON.stringify(data));
  wstream.end();
}

// Print the file
function read(){
  let readStream = fs.createReadStream(path);
  readStream.pipe(process.stdout);
}

// Find a key.
function find(key){
    console.debug(`Start searching the Key "${key}"` );

    let readStream = fs.createReadStream(path);
    let buffers = [];
    readStream
    .on('data', (chunk)=>{
        buffers.push(chunk);
      }
    )

    .on('end', ()=>{
        let jsonData = JSON.parse(Buffer.concat(buffers).toString());
        let value = jsonData[key];
      
        if(value !== undefined){
          console.log(`{"${key}":${value}}`);
        }else{
          throw new AppError(`Missing key: "${key}". Please add it first!`);
        }
    });
}

module.exports = {save, read, find, remove}

