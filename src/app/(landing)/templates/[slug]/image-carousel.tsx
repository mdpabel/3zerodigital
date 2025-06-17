'use client';
import Slider from 'react-slick';

// Import Slick styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

const ImageCarousel = ({ images }: { images: string[] }) => {
  // React Slick Settings
  const sliderSettings = {
    dots: true,
    infinite: images.length > 1, // Disable infinite mode if there's only one image
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: images.length > 1, // Disable autoplay if there's only one image
    autoplaySpeed: 3000,
  };

  return (
    <div className='relative mb-4'>
      <Slider {...sliderSettings}>
        {images.map((image) => (
          <img
            key={image}
            src={image}
            alt={`Product Image ${image}`}
            className='rounded-lg w-full object-fill'
          />
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
