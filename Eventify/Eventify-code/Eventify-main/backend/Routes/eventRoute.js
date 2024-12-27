const express = require("express");
const {
  createEvent,
  getAllEvents,
  registerEvent,
  alreadyRegisteredEvents,
  cancelRegistration,
  getEventById,
  updateEvent,
  getUserRegistrations,
  createTeamEvent,
  getAllTeamEvents,
  registerTeamEvent,
  getTeamRegistrations,
} = require("../Controllers/eventController");
const {
  isAuthenticated,
  isAuthenticatedAdmin,
} = require("../Middleware/isAuthenticated");

const router = express.Router();

//user side event routes
router.get("/events", getAllEvents);
router.get("/team-events", getAllTeamEvents);
router.post("/register-event", isAuthenticated, registerEvent);
router.post("/register-team-event", isAuthenticated, registerTeamEvent);
router.get("/registered-events", isAuthenticated, alreadyRegisteredEvents);
router.post("/cancel-registration", isAuthenticated, cancelRegistration);

//admin side event routes
router.post("/create-event", isAuthenticatedAdmin, createEvent);
router.put("/events/:eventId", isAuthenticatedAdmin, updateEvent);
router.get("/events/:eventId", getEventById);
router.get("/registrations", isAuthenticatedAdmin, getUserRegistrations);
router.get("/team-registrations", isAuthenticatedAdmin, getTeamRegistrations);
router.post("/create-team-event", isAuthenticatedAdmin, createTeamEvent);

module.exports = router;
