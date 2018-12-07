const path = require('path');
const fs = require('fs').promises;

const getStaticFileFromUrl = async url => {
 const filePath = path.join('views', 'home', url);
 return await fs.readFile(filePath);
};

module.exports = getStaticFileFromUrl;
