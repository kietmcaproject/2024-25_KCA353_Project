import Image from 'next/image';
import styles from './CategoryCard.module.css';

export default function CategoryCard({ title, img }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image src={`/${img}`} fill style={{ objectFit: 'cover' }} alt={title} />
      </div>
      <div className={styles.overlay}>
        <h3 className={styles.title}>{title}</h3>
      </div>
    </div>
  );
}
