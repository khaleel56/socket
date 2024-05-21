const handler = require('../utils/handler');
const socket = require('../utils/socket');

const ImageModel = require('../models/imageModel');


exports.uploadImage = async (req, res, next) =>{
    try {
      const { filename, originalname, mimeType, path } = req.file;
      const  base64Content= await handler.convertFileToBase64(path); 

        const imageData = new ImageModel({
            filename: originalname,
            type: mimeType,
            content: base64Content
        });
  
      await imageData.save();

      socket.getIo().emit('uploadDocument', imageData.filename);

      return res.json({ message: 'sucess', imageData });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ message: 'Upload failed' });
    }
}
  
exports.getImages = async(req, res, next) =>{
    try{
        const images = await ImageModel.find().select('type filename').lean();
        res.json({ message: 'sucess', images });
    } catch (error) {
        console.error('error in image fetch:', error);
        res.status(500).json({ message: 'image fetch failed' });
      }
}