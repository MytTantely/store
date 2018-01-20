#! /usr/bin/env node

const ManageStream = require('./helper/manageStream');
const AppError = require('./exception/AppError');

const extract = require('./helper/extractParameters').extract;
const Tools = require('./helper/manageKeyValue');

run();

// Main Entry Point.
function run(){
    try{
        let op = extract(process.argv);

        switch(op.name) {
            case 'ADD':
                Tools.add(op.key, op.value);
                break;  
            
            case 'LIST':
                Tools.list();
                break;

            case 'GET':
                Tools.get(op.key);
                break;

            case 'REMOVE':
                Tools.remove(op.key);
                break;
            
            default:
                break;
        }
    }catch(err){
        if (err instanceof AppError) {
            console.error(err.message);
        } else {
            console.error('Unknown error', err);
        }
    }
}

// Handling Async Error
process.on('uncaughtException', function(err) {
    if (err instanceof AppError) {
        console.error(err.message);
    } else {
        // Let the application crash for unknown exception
        console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
        console.error(err.stack);
        process.exit(1);
    }
});