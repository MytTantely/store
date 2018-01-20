/**
 * This is a set of function to handle the arguments and validate them.
 */
const listOps = require('../../config/conf.json').operations;// Allow to validate the operation allowed and the parameters expected.
const AppError = require('./../exception/AppError');

function extract(argvs){
    if(argvs.length < 3){
        throw new AppError('Please specify the operation and the required parameters');
    }

    return getOp(argvs);
}

function getOp(args){
    let opFound = false;
    let opName = args[2];
    let op = null;
    for(let i=0; i<listOps.length; i++){
        if(listOps[i].name === opName.toUpperCase()){
            op = listOps[i];
            opFound = true;
        }
    }

    if(!opFound){
        throw new AppError(`The operation ${opName} is not allowed or not implemented yet.`);
    }else{
        if((args.length - 3) === op.parameters){
            setParams(op, args);
            return op;
        }else{
            throw new AppError(`Please double check the number of parameters required for ${op.name}, it expects ${op.parameters} parameter(s).`);
        }
    }
}

function setParams(op, args){
    for(let i = 1; i <= op.parameters; i++){
        let val = "value";
        if(i===1) val = "key";
        op[val] = args[2 + i];
    }
}

module.exports = {extract};