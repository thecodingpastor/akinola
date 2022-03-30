import { useEffect, useContext } from "react";

import classes from "./Home.module.scss";
import Slider from "./Slider/Slider";
import PostContext from "../../../context/Post/PostContext";

const HomePage = () => {
  const { GetSliderData, SliderData } = useContext(PostContext);
  useEffect(() => {
    if (SliderData.length < 1) GetSliderData();
  }, [SliderData.length]);

  if (SliderData.length < 3) return "";
  return (
    <div className={classes.Container}>
      <Slider SliderData={SliderData} />
    </div>
  );
};

export default HomePage;
