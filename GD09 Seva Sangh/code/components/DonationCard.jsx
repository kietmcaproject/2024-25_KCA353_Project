import Image from 'next/image';
import styles from './DonationCard.module.css'; // Ensure correct path

export default function DonationCard({ title, img, description }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image src={`/${img}`} alt={title} layout="fill" objectFit="cover" className={styles.image} />
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <button className={styles.donateButton}>Donate Now</button>
      </div>
    </div>
  );
}
