import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { carouselData } from "../data/Data";
import '../../css/Carousel.css';
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Carousel() {
  const sliderRef = useRef(null); // Create a ref for the slider
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Function to go to the next slide
  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  // Function to go to the previous slide
  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
  };

  return (
    <div className="container-fluid p-0 mb-5">
      <div id="header-carousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <Slider ref={sliderRef} {...settings}>
            {carouselData.map((val, index) => (
              <div className="carousel-item" key={index}>
                <img className="w-100" style={{ height: '92vh' }} src={val.img} alt="Image" />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: "700px" }}>
                    <h6 className="section-title text-white text-uppercase mb-3 animated slideInDown">
                      {val.subtitle}
                    </h6>
                    <h1 className="display-3 text-white mb-4 animated slideInDown">
                      {val.title}
                    </h1>
                    <button
                      className="btn btn-light py-md-3 px-md-5 me-3 animated"
                      style={{ backgroundColor: '#ff4c4c' }}
                      onClick={() => navigate('/login')} // Navigate to login on button click
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          onClick={previous} // Call previous function on click
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          onClick={next} // Call next function on click
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
