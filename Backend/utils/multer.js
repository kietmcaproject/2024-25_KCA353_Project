// Import necessary packages
const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs-extra");
const { v6: uuidv6, v4: uuidv4 } = require("uuid");
const cloudinary = require("cloudinary").v2;
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { log } = require("console");
const { type } = require("os");

cloudinary.config({
  cloud_name: "dbjbs8vzs",
  api_key: "142433529124641",
  api_secret:"54Fe7rug98xw3YKVi2hRZ1gMhq8" ,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "..", "public", "data", "images");
    fs.ensureDirSync(uploadPath); // Ensure the directory exists
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffixAdv = uuidv4();
    const uniqueSuffix = uuidv6();
    cb(null, uniqueSuffix + uniqueSuffixAdv + "-" + file.originalname);
  },
});
// Specifing the max image size
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 7 * 1024 * 1024 },
// });

const upload = multer({
  storage: multer.memoryStorage(), // Store files in memory instead of disk
  limits: { fileSize: 7 * 1024 * 1024 }, // Limit file size to 7MB
});

// Utility function to delete temporary files after upload
const deleteTempFiles = (files) => {
  files.forEach((file) => {
    const filePath = file.path;
    fs.unlink(filePath, (err) => {
      if (err) console.error(`Failed to delete the ${filePath}`, err);
      else console.log(`Deleted temp file: ${filePath}`);
    });
  });
};

const uploadToCloudinary = (file, retryCount = 3) => {
  return new Promise((resolve, reject) => {
    const attemptUpload = (attemptsLeft) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "Green-Loop", timeout: 20000 },
        (error, result) => {
          if (error) {
            if (attemptsLeft > 0) {
              console.log(
                `Retrying upload... Attempts left: ${attemptsLeft - 1}`
              );
              return attemptUpload(attemptsLeft - 1); // Retry the upload
            }
            return reject(
              new CustomError.BadRequestError(
                "Something went wrong while uploading image into the cloud.",
                error.message
              )
            );
          }
          resolve(result.secure_url); // Resolve with the result from Cloudinary
        }
      );
      stream.end(file.buffer); // End the stream with the file buffer
    };

    attemptUpload(retryCount); // Start with the defined retry count
  });
};

router.post("/upload-img", upload.any(), async (req, res) => {
  try {
    const primaryImages = req.files.filter(
      (file) => file.fieldname === "primaryImages[]"
    );

    // handling primary Images
    const primaryImageResponse = await Promise.all(
      primaryImages.map((file) => uploadToCloudinary(file))
    );

    const colorImageResponse = [];
    let colorNames;

    if (typeof req.body.colorName === "string") {
      try {
        // Parse stringified JSON
        colorNames = JSON.parse(req.body.colorName);
      } catch (err) {
        console.error("Error parsing JSON:", err);
        return res.status(400).json({ error: "Invalid JSON format" });
      }
    } else {
      colorNames = req.body.colorName || [];
    }

    for (let index = 0; index < colorNames.length; index++) {
      const colorName = colorNames[index];

      // Access the corresponding color images
      const colorFiles = req.files.filter(
        (file) => file.fieldname === `colorImg[${index}][]`
      );

      // Upload all the color images and wait for the result
      const uploadColorImage = await Promise.all(
        colorFiles.map((file) => uploadToCloudinary(file))
      );

      // Push the resolved images and color name to the response
      colorImageResponse.push({
        colorName: colorName,
        images: uploadColorImage, // now contains resolved URLs
      });
    }

    res.status(StatusCodes.OK).json({
      message: "Images Uploaded Successfully",
      images: {
        primaryImage: primaryImageResponse,
        colorImage: colorImageResponse,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error uploading images",
      error: error.message,
    });
  }
});
module.exports = router;

// Below route will handle multiple or single array of images
// router.post(
//   "/upload-img",
//   upload.fields([{ name: "primaryImages[]" }, { name: "galleryImg[]" }]),
//   async (req, res) => {
//     try {
//       const productImg = req.files["productImg[]"] || [];
//       const galleryImg = req.files["galleryImg[]"] || [];

//       const productImagePromises = productImg.map((file) =>
//         uploadToCloudinary(file)
//       );
//       const galleryImagePromises = galleryImg.map((file) =>
//         uploadToCloudinary(file)
//       );

//       const productImagesURL = await Promise.all(productImagePromises);
//       const galleryImagesURL = await Promise.all(galleryImagePromises);

//       res.status(StatusCodes.OK).json({
//         message: "Images Upload Successfully",
//         images: {
//           productImages: productImagesURL,
//           galleryImages: galleryImagesURL,
//         },
//       });
//     } catch (error) {
//       res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//         message: "Error uploading images",
//         error: error.message,
//       });
//     }
//   }
// );

// if there is single array of images
// router.post("/upload-img", upload.array("images", 10), async (req, res) => {
//   try {
//     const uploadPromises = req.files.map((file) => {
//       return uploadToCloudinary(file);
//     });

//     const uploadResult = await Promise.all(uploadPromises);

//     const uploadImages = uploadResult.map((result) => result.secure_url);

//     res.status(StatusCodes.OK).json({
//       message: "Images uploaded successfully",
//       images: uploadImages,
//     });
//   } catch (error) {
//     res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ message: "Error uploading images", error: error.message });
//   }
// });

// Configure Multer to store files in public/data/images
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(__dirname, "..", "public", "data", "images");
//     fs.ensureDirSync(uploadPath); // Ensure the directory exists
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = uuidv4();
//     cb(
//       null,
//       file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
//     ); // Use a unique name for each file
//   },
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 7 * 1024 * 1024 },
// });

// // POST route to handle image upload
// router.post("/upload-img", (req, res) => {
//   const uploadHandler = upload.any();
//   uploadHandler(req, res, async (err) => {
//     if (err) {
//       return res.status(400).json({ error: err.message });
//     }

// {
//   /* <>--------------------------------------------------------------------</> */
// }

// try {
//   const files = req.files;
//   // console.log(files);
//   files.filter(async (f) => {
//     const res = await uploadToCloudinary(f.path);
//     fs.removeSync(f.path);
//     console.log(res.secure_url);
//   });
//   // deleteTempFiles(files);
//   res.status(StatusCodes.CREATED).json({ msg: "test proceeded" });
// } catch (error) {
//   throw new CustomError.BadRequestError(error);
// }

// {
//   /* <>--------------------------------------------------------------------</> */
// }

//     try {

//       const files = req.files;
//       if (!files || files.length === 0) {
//         return res.status(400).json({ error: "No files uploaded" });
//       }

//       const uploadPromises = files.map((file) => {
//         return new Promise((resolve, reject) => {
//           cloudinary.uploader.upload(
//             file.path,
//             {
//               folder: "salim_api_product_images", // Specify a folder in Cloudinary
//             },
//             (error, result) => {
//               if (error) {
//                 reject(error);
//               } else {
//                 resolve(result);
//               }
//             }
//           );
//         });
//       });

//       const results = await Promise.all(uploadPromises);

//       // Delete local files after successful upload
//       files.forEach((file) => {
//         const filePath = path.join(
//           __dirname,
//           "public",
//           "tempImg",
//           file.filename
//         );
//         fs.remove(filePath, (err) => {
//           if (err) {
//             console.error(`Failed to delete file ${filePath}:`, err);
//           }
//         });
//       });

//       res.status(200).json({
//         message: "Images uploaded successfully",
//         data: results,
//       });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });
// });

// const obj = {
//   primaryImages: ["primary_3.jpeg", "primary_2.jpeg", "primary_1.png"],
//   colorImages: {
//     red: ["red_shoes_2.webp", "red_shoes_1.png"],
//     blue: ["blue_shoes_2.png", "blue_shoes_1.png"],
//     orange: ["orange_shoes_2.png", "orange_shoes_1.png"],
//   },
// };
