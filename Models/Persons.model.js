const fs=require('fs');
const path = require('path');

const PersonsList=fs.readFileSync(path.join(__dirname,"../Persons.json"),"utf8")

module.exports = {
    PersonsList
}