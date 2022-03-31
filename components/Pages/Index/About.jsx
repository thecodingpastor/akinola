import classes from "./About.module.scss";

const About = () => {
  console.log(process.env.APP_URL);
  console.log(process.env.TOKEN_EXPIRES);
  console.log(process.env.ADMIN_EMAIL);
  console.log(process.env);
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
          <span>Data&nbsp;Science</span>
          <span>Machine&nbsp;Learning</span>
          <span>Team&nbsp;Leadership&nbsp;&&nbsp;Development </span>
        </div>
      </section>
      <div className={classes.Wave}>
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className={classes.ShapeFill}
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default About;
