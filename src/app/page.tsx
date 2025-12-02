// import About from '../components/About/About';
// import Prices from '../components/Prices/Prices'
// import Contact from '../components/Contact/Contact';
// import ProjectsLayout from '..components/ProjectsLayout/ProjectsLayout'
// import Footer from '../components/Footer/Footer';

import Header from './components/Header/Header'
import Hero from './components/Hero/Hero';
import Benefit from './components/Benefit/Benefit';



export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        <Hero />
         <Benefit />
        {/*<ProjectsLayout />
        <Prices />
        <About />
        <Contact /> */}
      </main>

      {/* <Footer /> */}
    </>
  );
}
