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
    <section className="tape-wrapper" aria-labelledby="tape-title">
      <div
        className="tape"
        ref={tapeRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        role="table"
      >
        <div className="tape__vs-badge" aria-hidden="true">
          VS
        </div>

        <header className="tape__header">
          <h2 id="tape-title">{t("tape.title")}</h2>
          <h3>{t("tape.subtitle") || "Soft Skills Showdown"}</h3>
        </header>

        {/* Desktop */}
        <div className="tape__table" role="rowgroup">
          <div className="tape__row tape__row--header" role="row">
            <div className="tape__cell tape__cell--left tape__cell--label-side" role="columnheader">
              {t("tape.leftTitle") || "MOI"}
            </div>
            <div className="tape__cell tape__cell--label" role="columnheader"></div>
            <div className="tape__cell tape__cell--right tape__cell--label-side" role="columnheader">
              {t("tape.rightTitle") || "DEV"}
            </div>
          </div>

          {rows.map((key) => (
            <div className="tape__row" key={key} role="row">
              <div className="tape__cell tape__cell--left" role="cell">
                {t(`tape.${key}.me`)}
              </div>
              <div className="tape__cell tape__cell--label" role="rowheader">
                {t(`tape.${key}.label`)}
              </div>
              <div className="tape__cell tape__cell--right" role="cell">
                {t(`tape.${key}.code`)}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile */}
        <div className="tape__mobile">
          {rows.map((key) => (
            <div className="tape__row-mobile" key={key}>
              <div className="tape__label">{t(`tape.${key}.label`)}</div>
              <div className="tape__cell tape__cell--left">{t(`tape.${key}.me`)}</div>
              <div className="tape__cell tape__cell--right">{t(`tape.${key}.code`)}</div>
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
