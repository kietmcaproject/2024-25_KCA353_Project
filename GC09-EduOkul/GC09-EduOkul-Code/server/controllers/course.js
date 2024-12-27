// import { instance } from "../index.js";
import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/Courses.js";
import { Lecture } from "../models/Lecture.js";
import { User } from "../models/User.js"

export const getAllCourses = TryCatch(async (req, res) => {

  const courses = await Courses.find();
  console.log(courses);
  res.json({
    courses,  
  });


  
});

export const getSingleCourse = TryCatch(async (req, res) => {
  const course = await Courses.findById(req.params.id);

  res.json({
    course,
  });
});

export const subscribeToCourse = TryCatch(async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user._id; // Assuming the user ID is available in `req.user` after authentication

  // Find the course by its ID
  const course = await Courses.findById(courseId);
  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }

  // Find the user by their ID
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Check if the user is already subscribed to the course
  if (user.subscription.includes(courseId)) {
    return res.status(400).json({ message: 'Already subscribed to this course' });
  }

  // Add the course to the user's subscriptions
  user.subscription.push(courseId);
  await user.save();

  return res.status(200).json({ message: 'Successfully subscribed to the course' });
});


export const fetchLectures = TryCatch(async (req, res) => {
  const lectures = await Lecture.find({ course: req.params.id });

  const user = await User.findById(req.user._id);

  if (user.role === "admin") {
    return res.json({ lectures });
  }

  if (!user.subscription.includes(req.params.id))
    return res.status(400).json({
      message: "You have not subscribed to this course",
    });

  res.json({ lectures });
});

export const fetchLecture = TryCatch(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);

  const user = await User.findById(req.user._id);

  if (user.role === "admin") {
    return res.json({ lecture });
  }

  if (!user.subscription.includes(lecture.course))
    return res.status(400).json({
      message: "You have not subscribed to this course",
    });

  res.json({ lecture });
});

export const getMyCourses = TryCatch(async (req, res) => {
  const courses = await Courses.find({ _id: req.user.subscription });

  res.json({
    courses,
  });
});

