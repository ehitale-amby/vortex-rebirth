const fs = require('fs');
const path = require('path');
const directoryPath = '../plugins';
let jsFileCount = 0;

fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('UNABLE TO SCAN VRT DIRECTORY: ' + err);
    } 
    files.forEach(function (file) {
        if (file.endsWith('.js')) {
            jsFileCount++;
        }
    });
    console.log(`Found ${jsFileCount} .js files in the vrt directory.`);
});
