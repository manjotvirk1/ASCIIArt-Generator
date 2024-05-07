import React, { useState } from 'react';
import ImageInput from './components/ImageInput';
import ImageProcessing from './components/ImageProcessing';

const Home = () => {
  const [asciiArt, setAsciiArt] = useState('');

  const handleImageUpload = (ascii) => {
    setAsciiArt(ascii);
  };

  return (
    <div>
      <h1>ASCII Art Generator</h1>
      <div className='combined-display'>
        <ImageInput onImageUpload={handleImageUpload} className='image-display'/>
        {asciiArt && (
          <ImageProcessing asciiArt={asciiArt} className='art-display'/> 
        )}
      </div>
    </div>
  );
};

export default Home;
