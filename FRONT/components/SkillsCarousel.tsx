"use client";

import { useKeenSlider } from "keen-slider/react";
import { useEffect, useRef, useState } from "react";
import { skills } from "@/data/skills";
import Image from "next/image";
import "keen-slider/keen-slider.min.css";
import "@/styles/components.scss";
import { useTranslation } from "react-i18next";

export default function SkillsCarousel() {
  const { t } = useTranslation();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true); // ➕ Nouvel état

  // ➕ Vérifie la largeur de l'écran
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1025);
    };
    handleResize(); // Initialisation
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 5,
      spacing: 10,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: { perView: 4, spacing: 10 },
      },
      "(max-width: 768px)": {
        slides: { perView: 3, spacing: 8 },
      },
      "(max-width: 600px)": {
        slides: { perView: 2, spacing: 6 },
      },
      "(max-width: 400px)": {
        slides: { perView: 1, spacing: 4 },
      },
    },
  });

  // 🔁 Défilement auto uniquement sur desktop
  useEffect(() => {
    if (!instanceRef.current || isHovered || !isDesktop) return;

    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 2000);

    return () => clearInterval(interval);
  }, [instanceRef, isHovered, isDesktop]);

  // 🖱️ Défilement au scroll (inchangé)
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !instanceRef.current) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      e.preventDefault();
      if (e.deltaY > 0) {
        instanceRef.current?.next();
      } else {
        instanceRef.current?.prev();
      }
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", onWheel);
    };
  }, [instanceRef]);

  return (
    <section id="skills" className="skills-carousel">
      <h2 className="skills-carousel__title">{t("skillsTitle")}</h2>

      <div
        ref={containerRef}
        className="skills-carousel__wrapper"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div ref={sliderRef} className="keen-slider">
          {skills.map((skill, i) => (
            <div className="keen-slider__slide skill-card" key={i}>
              <Image
                src={skill.logo}
                alt={skill.name}
                width={60}
                height={60}
              />
              <p>{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
