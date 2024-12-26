const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { loginUser, updateUser, getUserByName, createUser, getuserdata, getUserById, deleteUserById } = require('../controllers/userController.js');
const authenticateJwt = require('../middlewares/authentication.js');

router.post('/signup',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('mobileno', 'Mobile number is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('username', 'Username is required').not().isEmpty(),
        check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
        check('address.street', 'Street address is required').not().isEmpty(),
        check('address.city', 'City is required').not().isEmpty(),
        check('address.state', 'State/Province is required').not().isEmpty(),
        check('address.postalcode', 'Postal code is required').not().isEmpty(),
        check('address.country', 'Country is required').not().isEmpty(),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(500).json({ errors: errors.array() });
        }
        createUser(req, res);
    }
);

router.post('/login', async (req, res) => {
    loginUser(req, res);
});

router.put('/update-profile',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('phone', 'Mobile number is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('username', 'Username is required').not().isEmpty(),
        check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
        check('address.street', 'Street address is required').not().isEmpty(),
        check('address.city', 'City is required').not().isEmpty(),
        check('address.state', 'State/Province is required').not().isEmpty(),
        check('address.postalcode', 'Postal code is required').not().isEmpty(),
        check('address.country', 'Country is required').not().isEmpty(),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(500).json({ errors: errors.array() });
        }
        updateUser(req, res);
    }
);

router.get('/user-details', authenticateJwt, async (req, res) => {
    getUserByName(req, res);
});

router.get('/dashboard', authenticateJwt, async (req, res) => {
    getuserdata(req, res);
});

router.get('/get-user', authenticateJwt, async (req, res) => {
    getUserById(req, res);
});

router.delete('/delete-account', authenticateJwt, async (req, res) => {
    deleteUserById(req, res);
});

module.exports = router;
