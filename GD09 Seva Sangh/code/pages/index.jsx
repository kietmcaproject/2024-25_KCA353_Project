import styles from '../styles/Home.module.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CategoryCard from '../components/CategoryCard';

const categories = [
  { title: 'Stationary', img: 'stationary.jpg' },
  { title: 'Clothes', img: 'clothes.jpg' },
  { title: 'Food', img: 'food.jpg' },
  { title: 'Footwears', img: 'footwears.jpg' },
  { title: 'Toys', img: 'toys.jpg' },
  { title: 'Blankets', img: 'blankets.jpg' },
];

export default function HomePage() {
  return (
    <div className={styles.container}>
      <header>
        <Navbar />
      </header>

      <main className={styles.main}>
        <h1 className={styles.heading}>Categories</h1>
        <div className={styles.grid}>
          {categories.map((category, index) => (
            <CategoryCard key={index} title={category.title} img={category.img} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
