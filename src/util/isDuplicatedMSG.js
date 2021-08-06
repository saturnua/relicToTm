const { equals } = require('ramda');
 function isDuplicatedMSG(newMSG, prevMSG) {
    return equals(newMSG, prevMSG);
}

module.exports = isDuplicatedMSG;
