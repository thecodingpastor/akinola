import { useState, useEffect } from "react";

import Slide from "./Slide";
import { FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi";

const Slider = ({ SliderData }) => {
  const [Index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = SliderData?.length - 1;
    if (Index < 0) setIndex(SliderData?.length - 1);
    if (Index > lastIndex) setIndex(0);
  }, [Index, SliderData]);

  const handleForwardClick = () => {
    setIndex(Index + 1);
  };

  const handleBackwardClick = () => {
    setIndex(Index - 1);
  };

  useEffect(() => {
    let slider = setInterval(() => setIndex(Index + 1), 20000);

    return () => clearInterval(slider);
  }, [Index]);

  return (
    <section className="slider_section">
      <div className="slider_section__center">
        {SliderData?.map((img, imgIndex) => {
          let position = "nextSlide";
          if (Index === imgIndex) position = "activeSlide";
          if (
            Index - 1 === imgIndex ||
            (Index === 0 && imgIndex === SliderData?.length - 1)
          )
            position = "lastSlide";

          return <Slide key={imgIndex} position={position} slideData={img} />;
        })}
      </div>
      <>
        <FiArrowLeftCircle
          className="slider_previous-arrow"
          onClick={handleBackwardClick}
        />
        <FiArrowRightCircle
          className="slider_next-arrow"
          onClick={handleForwardClick}
        />
      </>
    </section>
  );
};

export default Slider;
