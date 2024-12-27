import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-page">
            <header className="about-header">
                <h1>About Us</h1>
                <p>Your one-stop platform for questions and answers.</p>
            </header>
            <section className="about-content">
                <div className="about-section">
                    <h2>Our Mission</h2>
                    <p>
                        We aim to connect people who have questions with those who have answers, fostering
                        a community of knowledge sharing and collaboration.
                    </p>
                </div>
                <div className="about-section">
                    <h2>Statistics</h2>
                    <div className="stats-grid">
                        <div className="stat-item">
                            <img 
                                src="https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=600" 
                                alt="Questions Icon" 
                                className="stat-image"
                            />
                            <p>Questions Answered</p>
                        </div>
                        <div className="stat-item">
                            <img 
                                src="https://images.pexels.com/photos/1181346/pexels-photo-1181346.jpeg?auto=compress&cs=tinysrgb&w=600" 
                                alt="Users Icon" 
                                className="stat-image"
                            />
                            <p>Active Users</p>
                        </div>
                        <div className="stat-item">
                            <img 
                                src="https://images.pexels.com/photos/4132298/pexels-photo-4132298.jpeg?auto=compress&cs=tinysrgb&w=600" 
                                alt="Contributors Icon" 
                                className="stat-image"
                            />
                            <p>Contributors</p>
                        </div>
                    </div>
                </div>
                <div className="about-section">
                    <h2>Features</h2>
                    <ul className="features-list">
                        <li>Comprehensive Q&A platform</li>
                        <li>Community-driven knowledge sharing</li>
                     <li>Clear identification of areas needing improvement.</li>
                     <li>Systematic process for learning, evolving, and improving user experience.</li>
                       
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default About;
