const ManageStream = require('./manageStream');

function add(){

}

function list(){
    ManageStream.read();
}

function get(key){
    ManageStream.find(key);
}

function remove(){

}

module.exports={add, list, get, remove}