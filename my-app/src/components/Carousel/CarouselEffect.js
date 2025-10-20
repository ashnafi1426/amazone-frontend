import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { img } from "./image/data";
import classes from "./Carousel.module.css";
const CarouselEffect = () => {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img.map((imageItemLink) => {
          return <img src={imageItemLink} alt="con"/>;
        })}
      </Carousel>
      <div className={classes.hero__img}></div>
    </div>
  );
};
export default CarouselEffect;