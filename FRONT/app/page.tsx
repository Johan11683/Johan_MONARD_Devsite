import ContactSection from "@/components/ContactSection";
import Hero from "@/components/Hero";
import SkillsCarousel from "@/components/SkillsCarousel";
import ProjectGrid from "@/components/ProjectGrid";

export default function Home() {
  return (
    <>
      <Hero />
      <SkillsCarousel />
      <ProjectGrid />
      <ContactSection />
    </>
  );
}