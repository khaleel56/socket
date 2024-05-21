const fs = require('fs').promises; // Use promises for asynchronous operations

exports.convertFileToBase64 = async(filePath) =>{
  const buffer = await fs.readFile(filePath);
  return buffer.toString('base64');
}

