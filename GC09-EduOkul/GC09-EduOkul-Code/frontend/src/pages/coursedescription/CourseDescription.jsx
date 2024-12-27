import React, { useEffect,useState} from "react";
import "./CourseDescription.css"
import { useNavigate,useParams } from "react-router-dom"
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
import { UserData } from "../../context/UserContext";
import Loading from "../../components/loading/Loading";
import axios from "axios";
import toast from "react-hot-toast";

const CourseDescription = ({user }) => {
  const params =useParams()
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const { fetchUser }  =UserData(); 
  const { fetchCourse,course,fetchCourses,fetchMyCourse} = CourseData();

  useEffect(() => {
        fetchCourse(params.id);
      }, []);

      const handleSubscription = async () => {
        if (!user) {
          toast.error("Please log in to subscribe to the course.");
          return;
        }

        setLoading(true);
    try {
      const token = localStorage.getItem("token");
      // API call to subscribe to the course (no payment)
      const response = await axios.post(
        `${server}/api/subscribe/${course._id}`,
        {},
        {
          headers: {
            token,
          },
        }
      );

      // If successful, update user data and show a success message
      await fetchUser(); // Re-fetch user data to update subscriptions
      toast.success("Subscribed successfully!");

      // Optional: Redirect to "My Courses" page after subscription
      navigate("/mycourse");
    } catch (error) {
      toast.error("Subscription failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
       {loading ? (
         <Loading />
       ) : (
    <>
    {course && (
            <div className="course-description">
              <div className="course-header">
                <img
                  src={`${server}/${course.image}`}
                  alt=""
                  className="course-image"
                />
                <div className="course-info">
                  <h2>{course.title}</h2>
                  <p>Instructor: {course.createdBy}</p>
                  <p>Duration: {course.duration} weeks</p>
                </div>
              </div>

              <p>{course.description}</p>

              <p>Let's get started with course At ₹{course.price}</p>

              {user && Array.isArray(user.subscription) && user.subscription.includes(course._id) ? (
                <button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="common-btn"
                >
                  Study
                </button>
              ) : (
                <button onClick={handleSubscription} className="common-btn">
                  Buy Now
                </button>
              )}
            </div>
          )}
    </>
    )}
    </>
  )
}

export default CourseDescription
