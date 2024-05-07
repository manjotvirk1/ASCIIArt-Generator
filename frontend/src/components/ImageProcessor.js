const ImageType = require('./ImageType');
const { createCanvas, loadImage } = require('canvas');


class ImageProcessor {
    constructor(imagePath) {
      this.imagePath = imagePath;
      this.imageType = new ImageType(imagePath);
    }
  
    async getMatrixAfterProcessing(scale) {
      const image = await this.getImage(this.imagePath);
      return this.getIntensityMatrix(image, scale);
    }
  
    async getImage(imagePath) {
      const canvas = createCanvas(200, 200); 
      const ctx = canvas.getContext('2d');
      try {
        const image = await loadImage(imagePath);
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
    
        return canvas;
      } catch (error) {
        console.error('Error loading image:', error);
        throw error;
      }
    }
  
    async getIntensityMatrix(image, scale) {
      const imageWidth = image.width;
      const imageHeight = image.height;
      const intensityMatrix = [];
  
      for (let j = 0; j < imageHeight; j++) {
        intensityMatrix[j] = [];
        for (let i = 0; i < imageWidth; i++) {
          intensityMatrix[j][i] = await this.calculateIntensity(image, i, j, scale);
        }
      }
      return intensityMatrix;
    }
  
    async calculateIntensity(image, i, j, scale) {
      let totalIntensity = 0;
      let totalPixels = 0;
      const imageData = await this.getImageData(image, i, j, scale);
  
      for (let k = 0; k < imageData.data.length; k += 4) {
        const red = imageData.data[k];
        const green = imageData.data[k + 1];
        const blue = imageData.data[k + 2];
        const intensity = (red / 3 + green / 3 + blue / 3);
        totalIntensity += intensity;
        totalPixels++;
      }
      return totalPixels === 0 ? 0 : totalIntensity / totalPixels;
    }
  
    async getImageData(image, x, y, scale) {
      const canvas = createCanvas(200, 200); 
      const ctx = canvas.getContext('2d');
      canvas.width = Math.min(scale * 2, image.width - x);
      canvas.height = Math.min(scale, image.height - y);
      ctx.drawImage(image, x, y, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
      return ctx.getImageData(0, 0, canvas.width, canvas.height);
    }
  }
  
  module.exports = ImageProcessor;
  