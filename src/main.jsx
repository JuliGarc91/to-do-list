import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import "./styles.css";

function Root() {
    const initialBackgroundImage = 'https://www.bbg.org/img/uploads/lightbox/_lightbox_retina/starburst_MS_51860951755.jpg';
    const backgroundImages = [
        'https://www.bbg.org/img/uploads/lightbox/_lightbox_retina/starburst_MS_51860951755.jpg',
        'https://www.bbg.org/img/uploads/lightbox/_lightbox_retina/snakes-head-fritillary_MS_52020358788.jpg',
        'https://www.bbg.org/img/uploads/lightbox/_lightbox_retina/spanish-bluebell_SS.jpg',
        'https://www.bbg.org/img/uploads/lightbox/_lightbox_retina/wildcolumbine_BB_26114708833.jpg',
        'https://www.bbg.org/img/uploads/lightbox/_lightbox_retina/early-flowering-cherry_MS_BBG3933.jpg',
        'https://www.bbg.org/img/uploads/lightbox/_lightbox_retina/15768824452_maple.jpg',
        'https://www.bbg.org/img/uploads/lightbox/_lightbox_retina/blackberry-lily_MS_50397559346_1.jpg'
    ];

    const [backgroundImage, setBackgroundImage] = useState(initialBackgroundImage);

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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>
);