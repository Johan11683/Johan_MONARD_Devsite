import Image from "next/image";
import styles from "@/styles/avatars.module.scss";
import boxeur from "@/public/images/avatar-boxeur.png";

export default function AvatarBoxe() {
  return (
    <div className={styles.avatar}>
      <Image src={boxeur} alt="Avatar boxeur" priority />
    </div>
  );
}
