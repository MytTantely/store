/**
 * These are the main operation allowed, 
 * The implementation may be different, that s why I used this layer, we can use DB, Rest API to CRUD
 * In this example I used a file with stream.  
 */
const ManageStream = require('./manageStream');

function add(key, val){
    ManageStream.save(key, val);
}

function list(){
    ManageStream.read();
}

function get(key){
    ManageStream.find(key);
}

function remove(key){
    ManageStream.remove(key);
}

module.exports={add, list, get, remove}