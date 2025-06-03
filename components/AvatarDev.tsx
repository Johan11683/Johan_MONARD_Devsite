import Image from "next/image";
import styles from "@/styles/avatars.module.scss";
import dev from "@/public/images/avatar-dev.png";

export default function AvatarDev() {
  return (
    <div className={styles.avatar}>
      <Image src={dev} alt="Avatar développeur" priority />
    </div>
  );
}
