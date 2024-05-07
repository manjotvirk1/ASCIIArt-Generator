class ImageType {
    constructor(imagePath) {
      this.imagePath = imagePath;
    }
  
    isValidImage() {
      let extension = null;
      try {
        const extensionStartIndex = this.imagePath.lastIndexOf('.');
        if (extensionStartIndex > 0 && extensionStartIndex < this.imagePath.length - 1) {
          extension = this.imagePath.substring(extensionStartIndex + 1);
        }
        return this.isValidExtension(extension.toLowerCase());
      } catch (error) {
        console.error(error);
        return false;
      }
    }
  
    isValidExtension(extension) {
      const JPG = 'jpg';
      const PNG = 'png';
      const JPEG = 'jpeg';
  
      return extension === JPG || extension === PNG || extension === JPEG;
    }
  }

  module.exports = ImageType;
  