import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Slide = ({ slideData, position }) => {
  const [Slide, setSlide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (position === "activeSlide") setSlide(true);
      else setSlide(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [position]);
  return (
    <article className={`slider_article ${position}`}>
      <Image
        src={slideData.coverImage}
        alt={slideData.title}
        className="slider_image"
        width="1500"
        height="800"
        blurDataURL="/images/question.jpg"
        placeholder="blur"
      />
      {/* <img
        src={slideData.coverImage}
        className="slider_image"
        alt={slideData.title}
      /> */}
      <div className="slider_overlay"></div>
      <Link href={`/blog/${slideData.slug}`}>
        <div
          className={`slider_article__section pointer ${
            position === "activeSlide" && Slide && "slide_in_from_left"
          }`}
        >
          <div className="heading">
            <div className="second">{slideData.title}</div>
          </div>

          <div>{slideData.description}</div>
        </div>
      </Link>
    </article>
  );
};

export default Slide;
