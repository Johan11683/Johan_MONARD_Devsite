"use client";

import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import "@/styles/tape.scss";

export default function TaleOfTheTape() {
  const { t } = useTranslation();
  const tapeRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = tapeRef.current?.getBoundingClientRect();
    if (!rect || !tapeRef.current) return;

    const x = e.clientX - rect.left;
    const middle = rect.width / 2;
    const rotate = x < middle ? -10 : 10;

    tapeRef.current.style.transform = `rotateY(${rotate}deg)`;
  };

  const handleMouseLeave = () => {
    if (tapeRef.current) {
      tapeRef.current.style.transform = "rotateY(0deg)";
    }
  };

  const rows = [
    "age",
    "experience",
    "endurance",
    "organisation",
    "problemSolving",
    "adaptability",
    "discipline",
    "vision",
  ];

  return (
    <section className="tape-wrapper">
      <div
        className="tape"
        ref={tapeRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="tape__vs-badge">VS</div>

        <div className="tape__header">
          <h2>{t("tape.title")}</h2>
          <h3>
            {t("tape.subtitle") !== "tape.subtitle"
              ? t("tape.subtitle")
              : "Soft Skills Showdown"}
          </h3>
        </div>

        {/* Version desktop */}
        <div className="tape__table">
          <div className="tape__row tape__row--header">
            <div className="tape__cell tape__cell--left tape__cell--label-side">
              {t("tape.leftTitle") || "MOI"}
            </div>
            <div className="tape__cell tape__cell--label"></div>
            <div className="tape__cell tape__cell--right tape__cell--label-side">
              {t("tape.rightTitle") || "DEV"}
            </div>
          </div>

          {rows.map((key) => (
            <div className="tape__row" key={key}>
              <div className="tape__cell tape__cell--left">
                {t(`tape.${key}.me`)}
              </div>
              <div className="tape__cell tape__cell--label">
                {t(`tape.${key}.label`)}
              </div>
              <div className="tape__cell tape__cell--right">
                {t(`tape.${key}.code`)}
              </div>
            </div>
          ))}
        </div>

        {/* Version mobile */}
        <div className="tape__mobile">
          {rows.map((key) => (
            <div className="tape__row-mobile" key={key}>
              <div className="tape__label">{t(`tape.${key}.label`)}</div>
              <div className="tape__cell tape__cell--left">
                {t(`tape.${key}.me`)}
              </div>
              <div className="tape__cell tape__cell--right">
                {t(`tape.${key}.code`)}
              </div>
            </div>
          ))}
        </div>

        <div className="tape__note">
          <em>{t("tape.note")}</em>
        </div>
      </div>
    </section>
  );
}
