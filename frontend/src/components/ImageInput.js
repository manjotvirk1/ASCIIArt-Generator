import React, { useState } from 'react';
import "../css/style.css";

const ImageInput = ({ onImageUpload }) => {
  const [image, setImage] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));
    if (file) {
      try {
        const formData = new FormData();
        formData.append('image', file);
        const response = await fetch('http://localhost:5000/upload', {
          method: 'POST',
          body: formData
        });
        const asciiArt = await response.text();
        onImageUpload(asciiArt); 
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <div>
      <label htmlFor="imageInput">Upload Image:</label>
      <input type="file" id="imageInput" accept="image/*" onChange={handleImageUpload} />
      <div className='image-container'>{image && <img className='uploaded-image' src={image} alt='uploaded pic'/>}</div>
    </div>
  );
};

export default ImageInput;
