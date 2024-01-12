// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import "./styles.css";

function Root() {
  const [backgroundImage, setBackgroundImage] = useState('https://www.bbg.org/img/uploads/lightbox/_lightbox_retina/starburst_MS_51860951755.jpg');
  const backgroundImages = ['https://www.bbg.org/img/uploads/lightbox/_lightbox_retina/starburst_MS_51860951755.jpg', 'https://www.bbg.org/img/uploads/lightbox/_lightbox_retina/azalea_BB_28781183938.jpg', 'https://www.bbg.org/img/uploads/lightbox/_lightbox_retina/camellia-winters-star-snowy_BB_11312791746.jpg'];

  const changeBackground = () => {
    const currentIndex = backgroundImages.indexOf(backgroundImage);
    const nextIndex = (currentIndex + 1) % backgroundImages.length;
    setBackgroundImage(backgroundImages[nextIndex]);
  };

  const divStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    width: '100%'
  };

  return (
    <div style={divStyle}>
      <button onClick={changeBackground}>Change Background</button>
      <App />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

