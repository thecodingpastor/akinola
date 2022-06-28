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
            I am a data scientist, currently deploying advanced data analytics
            techniques and machine learning algorithms to build predictive
            models for real world applications. My mantra is value creation, and
            I have consistently added value through problem solving, tutoring,
            coaching, guiding and empowering individuals to aspire to greatness.
            I am passionate about learning, research, innovation, personal
            development and leadership. I hold bachelor’s and master’s degrees
            in Physics and a master's degree in Computer Science & Quantitative
            Methods. I am committed to life-long learning and sharing knowledge
            with others. I enjoy leading diverse teams and drawing on the
            diverse strengths of everyone on the team. A proud husband and
            father, who enjoy playing scrabble, chess, piano, and soccer at my
            leisure. Various life experiences have taught me the importance of
            honesty, discipline, hard work, and perseverance. My goals are to
            contribute significantly to Artificial Intelligence development and
            to inspire the sleeping giant within every individual I meet.
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
