import React, { useState, useEffect, useRef } from 'react';
import '../css/style.css'

const ImageProcessing = ({ asciiArt }) => {
  const [formattedAscii, setFormattedAscii] = useState('');
  const asciiContainerRef = useRef(null);

  useEffect(() => {
    formatAsciiArt();

    handleResize();
    // window.addEventListener('resize', handleResize);

    // return () => {
    //   window.removeEventListener('resize', handleResize);
    // };
  }, [asciiArt]); 

  const formatAsciiArt = () => {
    setFormattedAscii(asciiArt);
  };

  const handleResize = () => {
    // // const containerWidth = asciiContainerRef.current.offsetWidth;
    // const containerWidth = 1000;
    // // const asciiLength = formattedAscii.split('\n')[0].length;
    // const asciiLength = 255;
    // const fontSize = containerWidth / (asciiLength * 1.4);
    // console.log(fontSize);
    // asciiContainerRef.current.style.fontSize = `${fontSize}px`;

    const containerWidth = asciiContainerRef.current.offsetWidth;
    const containerHeight = asciiContainerRef.current.offsetHeight;
    const charactersPerLine = Math.floor(containerWidth / 5); 
    const lines = Math.floor(containerHeight/3);
    const fontSize = Math.min(containerWidth / charactersPerLine, containerHeight / lines);
    asciiContainerRef.current.style.fontSize = `${fontSize}px`;

  };

  return (
    <pre className="ascii-container" ref={asciiContainerRef}>
      {formattedAscii}
    </pre>
  );
};

export default ImageProcessing;
