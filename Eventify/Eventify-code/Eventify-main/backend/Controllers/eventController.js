// const Event = require("./../Models/eventModel");
// const Registration = require("./../Models/registrationModel");
// const Event = require("./../Models/eventModel");

// const createEvent = async (req, res) => {
//   try {
//     const data = req.body;
//     const event = new Event(data);
//     await event.save();
//     res.status(200).json({
//       success: "true",
//       message: "event has been successfully created",
//       event,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: "false",
//       message: `Error: ${error.message}`,
//     });
//   }
// };

// const getAllEvents = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 9;
//     const skip = (page - 1) * limit;

//     const events = await Event.find().skip(skip).limit(limit);

//     res.status(200).json({
//       success: "true",
//       events,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: "false",
//       message: "Failed to Access Events",
//     });
//   }
// };

// const registerEvent = async (req, res) => {
//   try {
//     const registration = new Registration({
//       user_id: req.user.id,
//       event_id: req.body.eventId,
//     });
//     const result = await registration.save();
//     res.status(200).json({
//       success: "true",
//       message: "Sucessfully registered",
//       registationDetails: result,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: "false",
//       message: `error: ${error.message}`,
//     });
//   }
// };

// const alreadyRegisteredEvents = async (req, res) => {
//   try {
//     const registeredEvents = await Registration.find({ user_id: req.user.id });
//     res.status(200).json({
//       success: "true",
//       registeredEvents,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: "false",
//       message: `error: ${error.message}`,
//     });
//   }
// };

// const cancelRegistration = async (req, res) => {
//   try {
//     const response = await Registration.deleteOne({
//       user_id: req.user.id,
//       event_id: req.body.eventId,
//     });
//     res.status(200).json({
//       success: "true",
//       message: "Registration has been canceled",
//       deleted: response,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: "false",
//       message: `error: ${error.message}`,
//     });
//   }
// };

// const getEventById = async (req, res) => {
//   try {
//     const event = await Event.findById(req.params.eventId);

//     res.status(200).json({
//       success: "true",
//       event,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: "false",
//       message: "Failed to Access Events",
//     });
//   }
// };

// const updateEvent = async (req, res) => {
//   try {
//     const updatedEvent = await Event.findByIdAndUpdate(
//       req.params.eventId,
//       req.body
//     );

//     res.status(200).json({
//       success: "true",
//       updatedEvent,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: "false",
//       message: `error: ${error.message}`,
//     });
//   }
// };

// // admin side controllers
// const getUserRegistrations = async (req, res) => {
//   try {
//     const registrations = await Registration.find()
//       .populate({
//         path: "user_id",
//         select: "firstName lastName email",
//       })
//       .populate({
//         path: "event_id",
//         select: "eventName",
//       });

//     res.status(200).json({
//       success: "true",
//       registrations,
//     });
//   } catch (error) {
//     console.error("Error fetching registrations:", error.message);
//   }
// };

// module.exports = {
//   getEventById,
//   createEvent,
//   getAllEvents,
//   registerEvent,
//   alreadyRegisteredEvents,
//   cancelRegistration,
//   updateEvent,
//   getUserRegistrations,
// };

const Event = require("./../Models/eventModel");
const Registration = require("./../Models/registrationModel");
const TeamEvent = require("./../Models/teamEvent");
const TeamRegistration = require("./../Models/teamRegistration");

// const getAllEvents = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 9;
//     const skip = (page - 1) * limit;

//     const events = await Event.aggregate([
//       { $skip: skip },
//       { $limit: limit },
//       {
//         $lookup: {
//           from: "registrations", // The name of the Registration collection
//           localField: "_id", // Local field (event's _id)
//           foreignField: "event_id", // Foreign field (registration's event_id)
//           as: "registrations", // Output field containing the registrations
//         },
//       },
//       {
//         $addFields: {
//           registrationsCount: { $size: "$registrations" }, // Count registrations
//         },
//       },
//     ]);

//     res.status(200).json({
//       success: "true",
//       events,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: "false",
//       message: "Failed to access events",
//     });
//   }
// };
const getAllEvents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;

    const events = await Event.aggregate([
      { $sort: { createdAt: -1 } }, // Sort by newest events
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: "registrations", // Ensure correct collection name
          localField: "_id",     // Local field in Event
          foreignField: "event_id", // Foreign field in Registration
          as: "registrations",   // Alias for joined data
        },
      },
      {
        $addFields: {
          registrationsCount: { $size: "$registrations" }, // Count registrations
        },
      },
    ]);

    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    console.error("Error in getAllEvents:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch events",
    });
  }
};

const getAllTeamEvents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;

    const teamEvents = await TeamEvent.aggregate([
      { $skip: skip },
      { $limit: limit },
      // {
      // $addFields: {
      //   registrationsCount: { $size: "$registrations" }, // Count registrations
      // },
      // },
    ]);

    res.status(200).json({
      success: "true",
      teamEvents,
    });
  } catch (error) {
    res.status(400).json({
      success: "false",
      message: "Failed to access events",
    });
  }
};

const registerEvent = async (req, res) => {
  try {
    const { eventId } = req.body;

    // Check if event has reached capacity
    const event = await Event.findById(eventId);
    if (event.registrationsCount >= event.capacity) {
      return res.status(400).json({
        success: "false",
        message: "Event has reached its capacity",
      });
    }

    // Create a registration record
    const registration = new Registration({
      user_id: req.user.id,
      event_id: eventId,
    });
    const result = await registration.save();

    // Update the registrationsCount in the Event model
    await Event.findByIdAndUpdate(eventId, {
      $inc: { registrationsCount: 1 }, // Increment registrations count by 1
    });

    res.status(200).json({
      success: "true",
      message: "Successfully registered",
      registrationDetails: result,
    });
  } catch (error) {
    res.status(400).json({
      success: "false",
      message: `Error: ${error.message}`,
    });
  }
};

const alreadyRegisteredEvents = async (req, res) => {
  try {
    const registeredEvents = await Registration.find({ user_id: req.user.id });
    res.status(200).json({
      success: "true",
      registeredEvents,
    });
  } catch (error) {
    res.status(400).json({
      success: "false",
      message: `Error: ${error.message}`,
    });
  }
};

const cancelRegistration = async (req, res) => {
  try {
    const { eventId } = req.body;

    // Find the registration record to ensure it exists
    const registration = await Registration.findOne({
      user_id: req.user.id,
      event_id: eventId,
    });

    if (!registration) {
      return res.status(400).json({
        success: "false",
        message: "No registration found to cancel",
      });
    }

    // Remove the registration record
    const response = await Registration.deleteOne({
      user_id: req.user.id,
      event_id: eventId,
    });

    // If the registration was deleted, decrement the registrationsCount in the Event model
    if (response.deletedCount > 0) {
      await Event.findByIdAndUpdate(eventId, {
        $inc: { registrationsCount: -1 }, // Decrement registrations count by 1
      });

      return res.status(200).json({
        success: "true",
        message: "Registration has been canceled",
        deleted: response,
      });
    }

    return res.status(400).json({
      success: "false",
      message: "Failed to cancel registration",
    });
  } catch (error) {
    res.status(400).json({
      success: "false",
      message: `Error: ${error.message}`,
    });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);

    res.status(200).json({
      success: "true",
      event,
    });
  } catch (error) {
    res.status(400).json({
      success: "false",
      message: "Failed to access event",
    });
  }
};

const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.eventId,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: "true",
      updatedEvent,
    });
  } catch (error) {
    res.status(400).json({
      success: "false",
      message: `Error: ${error.message}`,
    });
  }
};

// Admin side controllers

const createEvent = async (req, res) => {
  try {
    const data = req.body;
    const event = new Event(data);
    await event.save();
    res.status(200).json({
      success: "true",
      message: "Event has been successfully created",
      event,
    });
  } catch (error) {
    res.status(400).json({
      success: "false",
      message: `Error: ${error.message}`,
    });
  }
};

const getUserRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate({
        path: "user_id",
        select: "firstName lastName email",
      })
      .populate({
        path: "event_id",
        select: "eventName",
      });

    res.status(200).json({
      success: "true",
      registrations,
    });
  } catch (error) {
    console.error("Error fetching registrations:", error.message);
  }
};

const createTeamEvent = async (req, res) => {
  try {
    const data = req.body;
    const teamEvent = new TeamEvent(data);
    await teamEvent.save();

    res.status(200).json({
      success: "true",
      message: "team event has been successfully created",
      teamEvent,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: "false",
      message: error.message,
    });
  }
};

const registerTeamEvent = async (req, res) => {
  try {
    const { teamEventId } = req.body;

    // Check if event has reached capacity
    const event = await TeamEvent.findById(teamEventId);
    if (event.registrationsCount >= event.maxTeams) {
      return res.status(400).json({
        success: "false",
        message: "Event has reached its capacity",
      });
    }

    // Create a registration record
    const registration = new TeamRegistration({
      ...req.body,
      user_id: req.user.id,
      event_id: teamEventId,
    });
    const result = await registration.save();

    // Update the registrationsCount in the Event model
    await TeamEvent.findByIdAndUpdate(teamEventId, {
      $inc: { registrationsCount: 1 }, // Increment registrations count by 1
    });

    res.status(200).json({
      success: "true",
      message: "Successfully registered",
      registrationDetails: result,
    });
  } catch (error) {
    res.status(400).json({
      success: "false",
      message: `Error: ${error.message}`,
    });
  }
};

const getTeamRegistrations = async (req, res) => {
  try {
    const registrations = await TeamRegistration.find()
      .populate("event_id", "eventName")
      .populate("user_id", "email");
    res.status(200).json({
      success: "true",
      registrations,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: "false",
      message: "Failed to fetch team registrations",
    });
  }
};

module.exports = {
  getEventById,
  createEvent,
  getAllEvents,
  registerEvent,
  alreadyRegisteredEvents,
  cancelRegistration,
  updateEvent,
  getUserRegistrations,
  createTeamEvent,
  getAllTeamEvents,
  registerTeamEvent,
  getTeamRegistrations,
};
