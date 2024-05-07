const ImageProcessor = require('./ImageProcessor');

class ImageToAscii {
  constructor(imagePath, scale) {
    this.scale = scale;
    this.imagePath = imagePath;
    this.imageProcessor = new ImageProcessor(imagePath);
  }

  async convertImageToAscii() {
    const data = await this.imageProcessor.getMatrixAfterProcessing(this.scale);
    const asciiArt = this.generateAsciiArt(data);
    return asciiArt;
  }

  generateAsciiArt(data) {
    let asciiArt = '';
    try {
      const height = data.length;
      const width = data[0].length;

      for (let i = 0; i < height; i += this.scale * 2) {
        for (let j = 0; j < width; j += this.scale) {
          const ch = this.getAsciiCharacter(data[i][j]);
          asciiArt += ch;
        }
        asciiArt += '\n';
      }
    } catch (error) {
      console.error(error);
    }
    return asciiArt;
  }

  getAsciiCharacter(intensity) {
    const asciiCharacters = [' ', '.', ',', '-', '~', '+', '=', '@', '_'];
    const index = Math.min(Math.floor((asciiCharacters.length - 1) * (intensity / 255)), asciiCharacters.length - 1);
    return asciiCharacters[index];
  }
}

module.exports = ImageToAscii;
