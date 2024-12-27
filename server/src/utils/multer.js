const multer = require('multer');
const path = require('path'); // Require the path module

// Multer storage configuration
const storage = (path) =>
  multer.diskStorage({
    // Set the destination for uploaded files
    destination: './uploads/' + path,
    filename: (req, file, cb) => {
      // Create a unique filename using the current timestamp
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

// Multer upload configuration
const upload = (path) =>
  multer({
    storage: storage(path),
    fileFilter: (req, file, cb) => {
      // Allow only PNG, JPG, and JPEG files
      if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
      ) {
        cb(null, true);
      } else {
        // Reject other file types
        cb(null, false);
        return cb(new Error('Only .png, .jpg, and .jpeg formats are allowed!'));
      }
    },
  });

module.exports = upload;
