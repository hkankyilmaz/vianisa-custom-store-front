import React from 'react';
import image from '../../assets/banner.webp';

function HomePageBanner() {
  return (
    <div className="homepage-banner">
      <img className="w-full" src={image}></img>
    </div>
  );
}

export default HomePageBanner;
