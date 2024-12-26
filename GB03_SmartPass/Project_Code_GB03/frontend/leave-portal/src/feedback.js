import React, { useState } from 'react';
import axios from 'axios';
import './feedback.css';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    studentName: '',
    studentId: '',
    hostel: '',
    department: '',
    suggestion: '',
    improvement: '',
    rating: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/feedback', feedback);
      console.log('Feedback submitted:', feedback);
      alert('Thank you for your feedback!');
      setFeedback({
        studentName: '',
        studentId: '',
        hostel: '',
        department: '',
        suggestion: '',
        improvement: '',
        rating: 0,
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again.');
    }
  };

  return (
    <div className="feedback-container">
      <h2>We Value Your Feedback</h2>
      <form onSubmit={handleSubmit} className="feedback-form">
        <label>
          <span>Student Name</span>
          <input
            type="text"
            name="studentName"
            value={feedback.studentName}
            onChange={handleChange}
            placeholder="Your name"
            required
          />
        </label>
        <label>
          <span>Student ID</span>
          <input
            type="text"
            name="studentId"
            value={feedback.studentId}
            onChange={handleChange}
            placeholder="Your student ID"
            required
          />
        </label>
        <label>
          <span>Hostel</span>
          <input
            type="text"
            name="hostel"
            value={feedback.hostel}
            onChange={handleChange}
            placeholder="Your hostel"
            required
          />
        </label>
        <label>
          <span>Department</span>
          <input
            type="text"
            name="department"
            value={feedback.department}
            onChange={handleChange}
            placeholder="Your department"
            required
          />
        </label>
        <label>
          <span>What do you think can be improved?</span>
          <textarea
            name="improvement"
            value={feedback.improvement}
            onChange={handleChange}
            placeholder="Your suggestions here..."
            required
          ></textarea>
        </label>
        <label>
          <span>Additional Suggestions</span>
          <textarea
            name="suggestion"
            value={feedback.suggestion}
            onChange={handleChange}
            placeholder="Any other feedback?"
          ></textarea>
        </label>
        <label>
          <span>Rate Our Portal : </span>
          <input
            type="number"
            name="rating"
            value={feedback.rating}
            onChange={handleChange}
            min="1"
            max="5"
            placeholder="1 to 5"
            required
          />
        </label>
        <button type="submit" className="submit-button">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
