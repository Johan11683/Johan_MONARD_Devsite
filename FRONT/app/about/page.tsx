"use client";

import TaleOfTheTape from "@/components/TaleOfTheTape";
import AvatarBoxe from "@/components/Avatar-boxeur";
import AvatarDev from "@/components/AvatarDev";
import styles from "@/styles/avatars.module.scss";

export default function AboutPage() {
  return (
    <main className={styles.aboutLayout}>
      <div className={styles.avatarContainer}>
        <AvatarBoxe />
        <div className={styles.taleContainer}>
          <TaleOfTheTape />
        </div>
        <AvatarDev />
      </div>
    </main>
  );
}
