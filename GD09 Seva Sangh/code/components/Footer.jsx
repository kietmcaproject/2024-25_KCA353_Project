import Link from 'next/link'; 
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <p>
          © {new Date().getFullYear()} <span>Seva Sangh</span>. All rights reserved.
        </p>
        <p>
          Made with ❤️ by <strong>Kulkamal Singh</strong>, Khushi and Harsh
        </p>
        {/* Social Media Links */}
        <div className={styles.socialLinks}>
          <Link href="https://facebook.com" legacyBehavior>
            <a target="_blank">Facebook</a>
          </Link>
          <Link href="https://twitter.com" legacyBehavior>
            <a target="_blank">Twitter</a>
          </Link>
          <Link href="https://www.instagram.com/kulkamalsingh/" legacyBehavior>
            <a target="_blank">Instagram</a>
          </Link>
        </div>
      </div>
    </footer>
  );
}
