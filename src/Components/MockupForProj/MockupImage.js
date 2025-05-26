import React from 'react';
import './MockupImage.css';

const MockupImage = ({ projectImage }) => {
  const fallbackImage = "/img/projpic.png";

  const imageSrc = projectImage || fallbackImage;

  return (
    <div className="mockup-wrapper">
      <img
        src={imageSrc}
        alt="Device Frame"
        className="device-frame"
      />
    </div>
  );
};

export default MockupImage;
