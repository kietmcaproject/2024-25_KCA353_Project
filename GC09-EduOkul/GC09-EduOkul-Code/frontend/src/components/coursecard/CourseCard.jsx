import React from "react";
import "./courseCard.css";
import { server } from "../../main";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { CourseData } from "../../context/CourseContext";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user, isAuth, fetchUser } = UserData();  
  const { fetchCourses } = CourseData();  


  const subscribeCourseHandler = async () => {
    try {
      if (!user) {
        toast.error("Please log in to subscribe to the course.");
        navigate("/login");
        return;
      }

      if (user.subscription.includes(course._id)) {
        toast.success("You are already subscribed to this course!");
        return;
      }

const response = await axios.post(
  `${server}/api/user/subscribe`,
  { courseId: course._id },
  {
    headers: { token: localStorage.getItem("token") }, 
  }
);


await fetchCourses();  
toast.success(response.data.message);  
navigate(`/course/study/${course._id}`); 
} catch (error) {
console.error("Error subscribing to the course:", error);
toast.error("Failed to subscribe. Please try again.");
}
};

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this course")) {
      try {
        const { data } = await axios.delete(`${server}/api/course/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        toast.success(data.message);
        fetchCourses();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

return (
<div className="course-card">

<img src={`${server}/${course.image}`} alt="Image Not available some error" className="course-image" />
{console.log(course.image)}
<h3>{course.title}</h3>
<p>Instructor- {course.createdBy}</p>
<p>Duration- {course.duration} weeks</p>
<p>Price- ₹{course.price}</p>

{isAuth ? (
<>
{user && user.role !== "admin" ? (
<>
{user.subscription.includes(course._id) ? (
<button
onClick={() => navigate(`/course/study/${course._id}`)}
className="common-btn"
>
Study
</button>
) : (
<button
onClick={() => navigate(`/course/${course._id}`)}
className="common-btn"
>
Get Started
</button>
)}
</>
) : (
<button
onClick={() => navigate(`/course/study/${course._id}`)}
className="common-btn"
>
Study
</button>
)}
</>
) : (
<button onClick={() => navigate("/login")} className="common-btn">
Get Started
</button>
)}

{/* {isAuth ? (
  <>
    {user.subscription.includes(course._id) ? (
      <button onClick={() => navigate(`/course/study/${course._id}`)} className="common-btn">
        Study
      </button>
    ) : (
      <button onClick={subscribeCourseHandler} className="common-btn">
        Subscribe Now
      </button>
    )}
  </>
) : (
  <button onClick={() => navigate("/login")} className="common-btn">
    Get Started
  </button>
)} */}

<br />

{user && user.role === "admin" && (
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this course?")) {
              deleteHandler(course._id);  
            }
          }}
          className="common-btn"
          style={{ background: "red" }}
        >
          Delete
        </button>
      )}

</div>
);
};

export default CourseCard;