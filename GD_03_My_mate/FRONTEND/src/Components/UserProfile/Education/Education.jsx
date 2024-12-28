import React from 'react';

const Education = ({ education }) => {
  return (
    <div className="education">
      <h2>Education</h2>
      {education.length > 0 ? (
        education.map((edu) => (
          <div key={edu._id} className="education-item">
            <p>{edu.institution}</p>
            <p>{edu.degree}</p>
          </div>
        ))
      ) : (
        <p>No education details available.</p>
      )}
    </div>
  );
};

export default Education;
