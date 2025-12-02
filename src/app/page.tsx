// import Contact from '../components/Contact/Contact';
// import Footer from '../components/Footer/Footer';

import Header from './components/Header/Header'
import Hero from './components/Hero/Hero';
import Benefit from './components/Benefit/Benefit';
import ProjectsLayout from './components/ProjectsLayout/ProjectsLayout'
import Prices from './components/Prices/Prices'
import About from './components/About/About';


export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        <Hero />
         <Benefit />
        <ProjectsLayout />
        <Prices />
        <About />
        {/* <Contact /> */}
      </main>

      {/* <Footer /> */}
    </>
  );
}
