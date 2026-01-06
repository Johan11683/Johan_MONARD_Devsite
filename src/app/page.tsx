import Header from './components/Header/Header'
import Hero from './components/Hero/Hero';
import Benefit from './components/Benefit/Benefit';
import ProjectsLayout from './components/ProjectsLayout/ProjectsLayout'
import Prices from './components/Prices/Prices'
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Process from './components/Process/Process';




export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        <Hero />
         <Benefit />
        <ProjectsLayout />
        <Prices />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
