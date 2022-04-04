import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Placeholders from "../../../../utils/pickRandomImage";

const Slide = ({ slideData, position }) => {
  const [Slide, setSlide] = useState(false);
  // const [RandomImage, _] = useState(
  //   Placeholders[Math.floor(Math.random() * Placeholders.length)]
  // );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (position === "activeSlide") setSlide(true);
      else setSlide(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [position]);
  return (
    <article className={`slider_article ${position}`}>
      <div
        style={{
          position: "relative",
          display: "block",
          width: "100%",
          height: "100%",
        }}
      >
        <Image
          src={slideData.coverImage}
          alt={slideData.title}
          className="slider_image"
          blurDataURL="/images/question.jpg"
          placeholder="blur"
          layout="fill"
        />
      </div>
      {/* <img
        src={
          slideData.coverImage
            ? slideData.coverImage
            : Placeholders[Math.floor(Math.random() * Placeholders.length)]
        }
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
