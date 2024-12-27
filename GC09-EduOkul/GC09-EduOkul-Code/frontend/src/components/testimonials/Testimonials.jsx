import React from "react";
import "./testimonials.css";

const Testimonials = () => {
  const testimonialsData = [
    {
      id: 1,
      name: "John Doe",
      position: "Student",
      message:
        "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
      image:
        "https://tse1.mm.bing.net/th?id=OIP.ryVJBJTTM4r-8AhpxZ_dNwHaHU&pid=Api&P=0&h=180",

        
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Student",
      message:
        "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
      image:
        "https://tse3.mm.bing.net/th?id=OIP.A-J99-xcCjQ8AVC0vDWLFwAAAA&pid=Api&P=0&h=180",
    },
    {
      id: 3,
      name: "John Doe",
      position: "Student",
      message:
        "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
      image:
        "https://rlxbuildingltd.co.uk/wp-content/uploads/2023/04/Testimonial-Avatars-3.jpg",
    },
    {
      id: 4,
      name: "Jane Smith",
      position: "Student",
      message:
        "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
      image:
        "https://tse1.mm.bing.net/th?id=OIP.ryVJBJTTM4r-8AhpxZ_dNwHaHU&pid=Api&P=0&h=180",
    },

    {
        id: 5,
        name: "Jane Smith",
        position: "Student",
        message:
          "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
        image:
          "https://tse3.mm.bing.net/th?id=OIP.A-J99-xcCjQ8AVC0vDWLFwAAAA&pid=Api&P=0&h=180",
      },
      {
        id: 6,
      name: "John Doe",
      position: "Student",
      message:
        "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
      image:
        "https://rlxbuildingltd.co.uk/wp-content/uploads/2023/04/Testimonial-Avatars-3.jpg",
    },
  ];
  return (
    <section className="testimonials">
      <h2>Reviews</h2>
      <div className="testmonials-cards">
        {testimonialsData.map((e) => (
          <div className="testimonial-card" key={e.id}>
            <div className="student-image">
              <img src={e.image} alt="" />
            </div>
            <p className="message">{e.message}</p>
            <div className="info">
              <p className="name">{e.name}</p>
              <p className="position">{e.position}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;