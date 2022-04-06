import { BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";
import classes from "./SocialMedia.module.scss";
const SocialMedia = () => {
  return (
    <div className={classes.Container}>
      <a
        href="https://github.com/teamindelible"
        target="_blank"
        rel="noreferrer"
      >
        <BsGithub title="Github" />
      </a>
      <a
        href="https://www.linkedin.com/in/michael-akinola"
        target="_blank"
        rel="noreferrer"
      >
        <BsLinkedin title="Linked In" />
      </a>
      <a
        href="https://twitter.com/MykelAkinola"
        target="_blank"
        rel="noreferrer"
      >
        <AiFillTwitterCircle title="Twitter" />
      </a>
    </div>
  );
};

export default SocialMedia;
