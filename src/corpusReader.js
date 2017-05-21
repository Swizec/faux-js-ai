
const fs = require('fs'),
      path = require('path');

// adapted from: http://stackoverflow.com/questions/10049557/reading-all-files-in-a-directory-store-them-in-objects-and-send-the-object
function readFiles(dirname, onFileContent, onError) {
    const filenames = fs.readdirSync(dirname);

    return filenames.filter(name => name.charAt(0) !== ".")
                    .map(filename => fs.readFileSync(path.join(dirname, filename), 'utf-8'));
}

module.exports = function () {
    let content = readFiles(path.resolve(__dirname, '../corpus'));
    content = content.concat(readFiles(path.resolve(__dirname, './')));

    return content.join("");
}
