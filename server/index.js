import mongoose from 'mongoose';
import requestSchema from './models/requestSchema.js';
import express from 'express';
import cors from 'cors';
import { generateFromEmail } from "unique-username-generator";
import { addRequest, allData, search, shortURL } from './cred.js';
import { User } from './models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import 'dotenv/config';
import cloudinary from 'cloudinary';
import { ImageUpload } from './models/ImageUploadSchema.js';
import { Transaction } from './models/TransactionSchema.js';

// Ensure 'uploads' directory exists
if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME_CLOUDINARY,
    api_key: process.env.CLOUD_API_KEY_CLOUDINARY,
    api_secret: process.env.CLOUD_API_SECRET_CLOUDINARY,
    secure: true,
});

console.log("Cloudinary configured successfully");

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Upload directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB size limit
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);

        if (extName && mimeType) {
            cb(null, true);
        } else {
            cb(new Error("Only images (jpeg, jpg, png) are allowed!"));
        }
    }
});

const JugaadRequest = mongoose.model('requests', requestSchema);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGOURL).then(() => {
    console.log("Connected to the database");
}).catch((err) => {
    console.log(err);
});

// Get all data
app.get(allData, (req, res) => {
    JugaadRequest.find({}).sort({ "CreatedAt": -1 }).then((data) => {
        res.send(data);
    }).catch((err) => {
        console.log(err);
    });
});

// Search for a particular request
app.get(search, (req, res) => {
    JugaadRequest.find({ _id: req.query._id }).then((data) => {
        res.send(data);
    }).catch((err) => {
        console.log("Error fetching the data: " + err);
    });
});

// Login a user
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    User.findOne({ Email: email }).then((user) => {
        if (!user) {
            res.send("User not found");
        } else {
            bcrypt.compare(password, user.Password, (err, isMatch) => {
                if (err) {
                    console.log(err);
                }

                if (!isMatch) {
                    res.send("Invalid credentials");
                } else {
                    jwt.sign({ id: user._id, firstname: user.FirstName, lastname: user.LastName, email: user.Email },
                        process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' }, (err, token) => {
                            if (err) {
                                console.log(err);
                            }

                            const localData = {
                                status: "success",
                                sign: token,
                                user
                            };

                            res.send(localData);
                        });
                }
            });
        }
    }).catch((err) => {
        console.log(err);
    });
});

// Get the data for a particular shortURL
app.get(shortURL, (req, res) => {
    JugaadRequest.find({ ShortID: req.query.ShortID }).then((data) => {
        res.send(data);
    }).catch((err) => {
        console.log("Error fetching the data: " + err);
    });
});

// Add a new request
app.post(addRequest, (req, res) => {
    const newRequest = new JugaadRequest(req.query);
    newRequest.save().then(() => {
        res.send("Request added successfully");
    }).catch((err) => {
        console.log(err);
    });
});

// Delete a request
app.delete('/delete', (req, res) => {
    JugaadRequest.deleteOne({ _id: req.query._id }).then(() => {
        res.send("Request deleted successfully");
    }).catch((err) => {
        console.log(err);
    });
});

// Upload photo
app.post('/upload_photo', upload.single('file'), (req, res) => {
    try {
        const { productUploadedBy, photoUploadedBy, productID } = req.body;

        console.log('File Info:', req.file);
        console.log('Metadata:', { productUploadedBy, photoUploadedBy, productID });

        //send to cloudinary
        cloudinary.v2.uploader.upload(req.file.path, { folder: 'jugaad' }, (error, result) => {
            if (error) {
                console.log('Error uploading image:', error);
                return;
            }

            console.log('Cloudinary Result:', result);

            fs.unlinkSync(req.file.path); //delete the file from uploads folder

            //add to database.
            const newImageUpload = new ImageUpload({
                ProductID: productID,
                ProductUploadedBy: productUploadedBy,
                ImageUploadedBy: photoUploadedBy,
                ImageURL: result.secure_url,
                ProductIdPlusImageUploadedByPlusProductUploadedBy: `${productID}-${photoUploadedBy}-${productUploadedBy}`
            });

            newImageUpload.save().then(() => {
                console.log('Image uploaded successfully!');
            }).catch((err) => {
                console.log('Error uploading image:', err);
            });
        })


        res.status(200).send({
            message: 'File uploaded successfully!'
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Register a new user
app.post('/register', (req, res) => {
    const { FirstName, LastName, Email, Password } = req.body;
    const username = generateFromEmail(Email);

    const newUser = new User({
        Username: username,
        FirstName: FirstName,
        LastName: LastName,
        Email: Email,
        Password: Password
    });

    newUser.save().then((user) => {
        jwt.sign({ id: user._id, firstname: user.FirstName, lastname: user.LastName, email: user.Email },
            process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' }, (err, token) => {
                if (err) {
                    console.log(err);
                }

                const localData = {
                    sign: token,
                    user
                };

                res.send(localData);
            });
    }).catch((err) => {
        console.log(err);
    });
});

// Get all images
app.get('/all_images', (req, res) => {
    ImageUpload.find({}).then((data) => {
        res.send(data);
    }).catch((err) => {
        console.log(err);
    });
});

app.post('/orders', (req, res) => {
    const { ProductID, ProductUploadedBy, ImageUploadedBy, ImageID, Amount, TransactionStatus, OrderID } = req.body;

    const newTransaction = new Transaction({
        ProductID: ProductID,
        ProductUploadedBy: ProductUploadedBy,
        ImageUploadedBy: ImageUploadedBy,
        ImageID: ImageID,
        Amount: Amount,
        TransactionStatus: TransactionStatus,
        OrderID: OrderID
    });

    newTransaction.save().then(() => {
        console.log("Transaction added successfully");
        res.status(200).send("Transaction added successfully");
    }).catch((err) => {
        console.log(err);
    });
})

app.get('/transactions', (req, res) => {
    Transaction.find({}).then((data) => {
        res.send(data);
    }).catch((err) => {
        console.log(err);
    });
})

// Listen to the port
app.listen(3000, () => {
    console.log('Server running on port 3000');
});