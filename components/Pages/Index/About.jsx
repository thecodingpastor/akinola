import Image from "next/image";

import classes from "./About.module.scss";

const About = () => {
  return (
    <div className={classes.Container} id="about">
      <h3>Meet Michael Akinola</h3>
      <section className={classes.About}>
        <div className={classes.MichaelContainer}>
          <Image
            src="/images/akin.jpg"
            alt="Michael Akinola"
            width={400}
            height="400"
            blurDataURL="/images/question.jpg"
            placeholder="blur"
          />
        </div>
        <section className={classes.AboutText}>
          <article>
            Michael is an industry experienced data scientist, deploying
            advanced data analytics techniques and machine learning algorithms
            to build predictive models for real world applications. His mantra
            is value creation, and he has consistently added value through
            tutoring, coaching, guiding and empowering individuals (younger ones
            and his contemporaries) to aspire to greatness. He is passionate
            about learning, research, innovation, and leadership. He holds
            bachelor’s and master’s degrees in Physics and a master's degree in
            Computer Science and Quantitative Methods. Michael is committed to
            life-long learning and sharing knowledge with others. He enjoys
            leading diverse teams and drawing on the diverse strengths of
            everyone on the team. A proud husband and father, who enjoys playing
            scrabble, chess, piano, and soccer at his leisure. Various life
            experiences have taught him the importance of honesty, discipline,
            hard work, and perseverance. His goals are to contribute
            significantly to AI development and to inspire the sleeping giant
            within every individual he meets.
          </article>
          <a
            href="resume.pdf"
            target="_blank"
            rel="noreferrer"
            className={classes.ResumeBtn}
          >
            Resume
          </a>
        </section>
      </section>
      <section className={classes.Skills}>
        <h5>Skills Summary</h5>
        <div className={classes.SkillList}>
          <span>R</span>
          <span>Python</span>
          <span>Data&nbsp;Science</span>
          <span>Data&nbsp;Analysis</span>
          <span>Machine&nbsp;Learning</span>
          <span>Team&nbsp;Leadership&nbsp;&&nbsp;Development </span>
        </div>
      </section>
    </div>
  );
};

export default About;
