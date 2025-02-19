import { useState } from "react";

// Import your local images
import largeImage1 from "../images/landing_slider/slider_image_1.png";
import largeImage2 from "../images/landing_slider/slider_image_2.png";
import smallImage1 from "../images/landing_slider/slider_image_1_mobile.png";
import smallImage2 from "../images/landing_slider/slider_image_2_mobile.png";

const ImageSlider = () => {
  const imagesLarge = [largeImage1, largeImage2]; // Two images for large screens
  const imagesSmall = [smallImage1, smallImage2]; // Two images for small screens

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return; // Prevent multiple clicks during animation
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesLarge.length);
      setIsAnimating(false);
    }, 500); // Match this duration with the Tailwind transition duration
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + imagesLarge.length) % imagesLarge.length
      );
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Image Slider Container */}
      <div
        className="relative w-full h-full flex justify-center items-center transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`, // Adjusts slide position
        }}
      >
        {/* Large screen images */}
        <div className="hidden md:flex w-full h-auto flex-shrink-0">
          {imagesLarge.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Large Slide ${index}`}
              className="w-full h-auto object-cover"
            />
          ))}
        </div>

        {/* Small screen images */}
        <div className="flex md:hidden w-full h-auto flex-shrink-0">
          {imagesSmall.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Small Slide ${index}`}
              className="w-full h-auto object-cover"
            />
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full opacity-75 hover:opacity-100"
      >
        &#60;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full opacity-75 hover:opacity-100"
      >
        &#62;
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {imagesLarge.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex
                ? "bg-white opacity-100"
                : "bg-gray-300 opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
