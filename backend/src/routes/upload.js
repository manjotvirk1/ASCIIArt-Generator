const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: './src/uploads/' });
const sharp = require('sharp');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const Image = require('../models/image');
const ImageToAscii = require('../../../frontend/src/components/ImageToAscii');

const processImage = (imagePath) => {
  return new Promise((resolve, reject) => {
    sharp(imagePath)
      .resize({ width: 300 })
      .toBuffer()
      .then(processedImageBuffer => {
        resolve(processedImageBuffer);
      })
      .catch(error => {
        console.error('Error processing image:', error);
        reject(new Error('Image processing failed'));
      });
  });
};

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const processedImageBuffer = await processImage(req.file.path);

    // unique filename for the image
    const imageFilename = `${uuidv4()}.jpg`;

    // Save the processed image to the filesystem
    fs.writeFileSync(`src/uploads/${imageFilename}`, processedImageBuffer);

    const imagePath = `C:/Mj/ascii/backend/src/uploads/${imageFilename}`;
    console.log(`Image path: ${imagePath}`);	
    const imageAscii = new ImageToAscii(imagePath, 1);
    const asciiArt = await imageAscii.convertImageToAscii();
    // console.log("asciiArt" + asciiArt);
    res.send(asciiArt);
  } catch (error) {
    console.error('Error uploading/processing image:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;