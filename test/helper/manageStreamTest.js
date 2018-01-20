const ManageStream = require('../../src/helper/manageStream');

let obj = {
    "q1":1,
    "q2":2,
    "q3":3
}

ManageStream.write(JSON.stringify(obj));

// ManageStream.read();
// ManageStream.find(process.argv[2]);
// console.log('Message!');