import classes from "./About.module.scss";

const About = () => {
  return (
    <div className={classes.Container} id="about">
      <h3>Meet Michael Akinola</h3>
      <section className={classes.About}>
        <div className={classes.MichaelContainer}>
          <img src="/images/akin.png" alt="Michael Akinola" />
        </div>
        <section className={classes.AboutText}>
          <article>
            Michael Akinola is an industry experienced data scientist, deploying
            advanced data analytics techniques and machine learning algorithms
            to build predictive models for real world applications in an
            automotive industry in the United States. His mantra is value
            creation, and he has consistently added value through tutoring,
            coaching, guiding and empowering individuals (younger ones and his
            contemporaries) to aspire to greatness. He is passionate about
            learning, research, innovation, and leadership. He holds a
            bachelor’s degree in Physics from Obafemi Awolowo University,
            Nigeria, master’s degrees in Physics from University of Lagos,
            Nigeria and Computer Science and Quantitative Methods from Austin
            Peay State University, Tennessee, United States. Michael is
            committed to life-long learning and sharing knowledge with others. I
            enjoy leading diverse teams and drawing on the diverse strengths of
            everyone on the team. A proud husband and father, who enjoys playing
            scrabble, chess, piano, and soccer. Various life experiences have
            taught me the importance of honesty, discipline, hard work, and
            perseverance. My goal is to inspire the sleeping giant within every
            individual I meet.
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
        <h4>Skills Summary</h4>
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
