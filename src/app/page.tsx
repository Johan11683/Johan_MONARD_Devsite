import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Benefit from "./components/Benefit/Benefit";
import Projects from "./components/ProjectsLayout/Projects";
import Prices from "./components/Prices/Prices";
import Process from "./components/Process/Process";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <Benefit />
        <Projects />
        <Prices />
        <Process />
        <About />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
