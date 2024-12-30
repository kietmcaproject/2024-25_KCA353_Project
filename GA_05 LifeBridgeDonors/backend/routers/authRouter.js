// const router = require("express").Router();
// const { User, BloodBank } = require("../models/models");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// // register

// router.post("/:handle", async (req, res) => {
//     try {
//         // validation
//         const handle = req.params.handle;
//         const existingUser = handle == "bank" ?
//             await BloodBank.findOne({ phone: req.body.phone }) :
//             await User.findOne({ phone: req.body.phone });
//         if (existingUser)
//             return res.status(400).json({
//                 errorMessage: "An account with this email already exists.",
//             });

//         // hash the password

//         const salt = await bcrypt.genSalt();
//         const passwordHash = await bcrypt.hash(req.body.password, salt);
//         req.body.password = passwordHash;
//         // save a new user account to the db

//         const newUser = handle == "bank" ? new BloodBank(req.body) : new User(req.body);
//         const savedUser = await newUser.save();

//         // sign the token
//         const token = jwt.sign({ user: savedUser._id, type: handle }, process.env.JWT_SECRET);

//         // send the token in a HTTP-only cookie

//         res.cookie("token", token, {
//             httpOnly: true,
//             secure: true,
//             sameSite: "none",
//         }).send();
//     } catch (err) {
//         console.error(err);
//         res.status(500).send();
//     }
// });

// // log in

// router.post("/login/:handle", async (req, res) => {
//     try {
//         const { phone, password } = req.body;
//         const handle = req.params.handle;
//         const existingUser = await (handle == "bank" ? BloodBank.findOne({ phone: phone }) : User.findOne({ phone: phone }));
//         if (!existingUser)
//             return res.status(401).json({ errorMessage: "Wrong username or password." });
//         const passwordCorrect = await bcrypt.compare(
//             password,
//             existingUser.password
//         );
//         if (!passwordCorrect)
//             return res.status(401).json({ errorMessage: "Wrong username or password." });

//         // sign the token

//         const token = jwt.sign(
//             {
//                 user: existingUser._id,
//                 type: handle
//             },
//             process.env.JWT_SECRET
//         );

//         // send the token in a HTTP-only cookie

//         res
//             .cookie("token", token, {
//                 httpOnly: true,
//                 secure: true,
//                 sameSite: "none",
//             })
//             .send();
//     } catch (err) {
//         console.error(err);
//         res.status(500).send();
//     }
// });

// router.get("/logout", (req, res) => {
//     res
//         .cookie("token", "", {
//             httpOnly: true,
//             secure: true,
//             sameSite: "none",
//         })
//         .send();
//     console.log("Logged Out")
// });

// router.get("/loggedIn", async (req, res) => {
//     try {
//         const token = req.cookies.token;
//         if (!token) return res.json({ auth: false });
//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await (verified.type == "bank" ? BloodBank : User).findOne({ _id: verified.user }, { password: 0, donations: 0, requests: 0, stock: 0, __v: 0 });
//         console.log("logged in")
//         res.send({ auth: true, user: user });
//     } catch (err) {
//         console.log(err);
//         res.json({ auth: false });
//     }
// });

// module.exports = router;

const router = require("express").Router();
const { User, BloodBank } = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const  {sendVerificationEmail} = require('../mailsending/mail.js')

// ------- Register Route -------
router.post("/:handle", async (req, res) => {
    try {
        const handle = req.params.handle;

        // Check if the account already exists
        const existingUser = handle === "bank"
            ? await BloodBank.findOne({ phone: req.body.phone })
            : await User.findOne({ phone: req.body.phone });
           console.log(existingUser)
        if ( existingUser) {
            return res.status(400).json({ errorMessage: "An account with this phone already exists." });
        }

        // Hash the password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(req.body.password, salt);
        req.body.password = passwordHash;

        // Generate a unique verification token
        const verificationToken = crypto.randomBytes(32).toString("hex");
        req.body.verificationToken = verificationToken;

        // Save new user/bank
        const newUser = handle === "bank" ? new BloodBank(req.body) : new User(req.body);
        const savedUser = await newUser.save();

        // Send verification email
        await sendVerificationEmail(req.body.email, verificationToken);

        res.status(201).json({ message: "Account created. Please verify your email to login." });
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

// ------- Email Verification Route -------
router.get("/verify/:token", async (req, res) => {
    try {
        const { token } = req.params;

        const user = await User.findOne({ verificationToken: token }) ||
                     await BloodBank.findOne({ verificationToken: token });

        console.log(user);             

        if (!user) {
            return res.status(400).json({ errorMessage: "Invalid or expired token." });
        }

        user.verified = true;
        user.verificationToken = undefined;  // Clear token after verification
        await user.save();

        res.status(200).json({ message: "Email verified successfully. You can now log in." });
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

// ------- Login Route -------
router.post("/login/:handle", async (req, res) => {
    try {
        const { phone, password } = req.body;
        const handle = req.params.handle;

        const existingUser = handle === "bank"
            ? await BloodBank.findOne({ phone: phone })
            : await User.findOne({ phone: phone });

        if (!existingUser) {
            return res.status(401).json({ errorMessage: "Wrong username or password." });
        }

        const passwordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!passwordCorrect) {
            return res.status(401).json({ errorMessage: "Wrong username or password." });
        }

        if (!existingUser.verified) {
            return res.status(403).json({ errorMessage: "Please verify your email before logging in." });
        }
        console.log("hello")
        const token = jwt.sign({ user: existingUser._id, type: handle }, process.env.JWT_SECRET);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        }).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

// ------- Resend Verification Email -------
router.post("/resend-verification", async (req, res) => {
    try {
        const { email, handle } = req.body;

        const user = handle === "bank"
            ? await BloodBank.findOne({ email })
            : await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ errorMessage: "No account with this email found." });
        }

        if (user.verified) {
            return res.status(400).json({ errorMessage: "This account is already verified." });
        }

        const verificationToken = crypto.randomBytes(32).toString("hex");
        user.verificationToken = verificationToken;
        await user.save();

        await sendVerificationEmail(email, verificationToken);

        res.status(200).json({ message: "Verification email resent." });
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

// ------- Logout Route -------
router.get("/logout", (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    }).send();
    console.log("Logged Out");
});

// ------- Check Logged In Status -------
router.get("/loggedIn", async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.json({ auth: false });

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const user = await (verified.type === "bank" ? BloodBank : User)
            .findOne({ _id: verified.user }, { password: 0, donations: 0, requests: 0, stock: 0, __v: 0 });

        console.log("Logged In");
        res.send({ auth: true, user: user });
    } catch (err) {
        console.log(err);
        res.json({ auth: false });
    }
});

module.exports = router;

