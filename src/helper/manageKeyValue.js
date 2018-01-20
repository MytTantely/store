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