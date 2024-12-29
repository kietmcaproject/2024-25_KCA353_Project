const Project = require("../Models/projectModel");

const createProjectController = async (req, res) => {
  try {
    const data = req.body;
    const images = data.image;
    console.log("from the project controller", images);
    const project = new Project(data);
    await project.save();

    res.status(200).json({
      success: "true",
      message: "Successfully Project added!!",
      project: data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: "false",
      message: `Error: ${error.message}`,
    });
  }
};

const getAllProjectController = async (req, res) => {
  try {
    const allProject = await Project.find();
    res.status(200).json({
      success: true,
      message: "Projects retrieved successfully",
      projects: allProject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
    console.log(error.message);
  }
};

// DELETE Project Controller
const deleteProjectController = async (req, res) => {
  try {
    const { projectId } = req.params;  // Get project ID from the URL

    // Find the project by ID and delete it
    const deletedProject = await Project.findByIdAndDelete(projectId);

    // If the project is not found, return 404
    if (!deletedProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
    console.log(error.message);
  }
};

module.exports = {
  createProjectController,
  getAllProjectController,
  deleteProjectController,  // Export delete controller
};
