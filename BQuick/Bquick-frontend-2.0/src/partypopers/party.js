// PartyCrackers.js
import { useEffect } from 'react';
import './party.css';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const PartyCrackers = () => {
  useEffect(() => {
    const createCracker = () => {
      const cracker = document.createElement('div');
      cracker.classList.add('cracker');

      // Set random position
      cracker.style.left = `${Math.random() * 100}vw`;
      cracker.style.top = `${Math.random() * 100}vh`;

      // Set random color
      cracker.style.backgroundColor = getRandomColor();

      // Append to body
      document.body.appendChild(cracker);

      // Remove the cracker after animation ends
      cracker.addEventListener('animationend', () => {
        cracker.remove();
      });
    };

    // Create multiple crackers
    const numberOfCrackers = 30; // Adjust the number of crackers
    for (let i = 0; i < numberOfCrackers; i++) {
      createCracker();
    }
  }, []);

  return null; // This component does not render anything
};

export default PartyCrackers;
