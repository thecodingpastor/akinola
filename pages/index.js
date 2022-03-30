import About from "../components/Pages/Index/About";
import Contact from "../components/Pages/Index/Contact";
import HomePage from "../components/Pages/Index/HomePage";
import Projects from "../components/Pages/Index/Projects";
import SocialMedia from "../components/Pages/Index/SocialMedia";

const Home = () => {
  return (
    <main id="home">
      <HomePage />
      <About />
      <Projects />
      <Contact />
      <SocialMedia />
    </main>
  );
};

export default Home;
