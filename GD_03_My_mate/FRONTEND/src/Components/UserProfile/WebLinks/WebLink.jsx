import React from 'react';

const WebLinks = ({ weblinks }) => {
  return (
    <div className="weblinks">
      <h2>Web Links</h2>
      {weblinks.length > 0 ? (
        weblinks.map((link) => (
          <div key={link._id} className="weblink">
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.name}
            </a>
          </div>
        ))
      ) : (
        <p>No web links available.</p>
      )}
    </div>
  );
};

export default WebLinks;
