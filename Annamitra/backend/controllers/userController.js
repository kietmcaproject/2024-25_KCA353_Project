const { User } = require('../models/user');
const { Donations } = require('../models/donations');
const { Recipients } = require('../models/recipients');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    const { name, mobileno, email, username, password } = req.body;
    const { street, city, state, postalcode, country } = req.body.address;

    try {
        const userExists = await User.findOne({ username });

        if (userExists) {
            return res.status(403).json({ message: 'User already exists' });
        }

        const newUser = new User({
            name,
            mobileno,
            email,
            username,
            password,
            address: {
                street,
                city,
                state,
                postalcode,
                country,
            },
        });
        await newUser.save();
        const token = jwt.sign({ username, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.status(200).json({ message: 'User created successfully', token });
    } catch (error) {
        console.error('User Creation Error:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.headers;
    const user = await User.findOne({ username, password });
    if (user) {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.json({ message: 'Logged in successfully', token });
    } else {
        res.status(403).json({ errorMessage: 'Invalid username or password' });
    }
}

const updateUser = async (req, res) => {
    const { name, phone, email, username, password } = req.body;
    const { street, city, state, postalcode, country } = req.body.address;

    try {
        const user = await User.findOne({ username });

        user.name = name;
        user.mobileno = phone;
        user.email = email;
        user.password = password;
        user.address.street = street;
        user.address.city = city;
        user.address.state = state;
        user.address.postalcode = postalcode;
        user.address.country = country;

        await user.save();

        res.status(200).json({ message: 'User updated successfully', user: user });
    } catch (error) {
        res.status(5000).json({ message: 'Server Error', error });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.headers.user_id })
        res.json({ user })
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getUserByName = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user.username });
        res.json({ user });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getuserdata = async (req, res) => {
    try {
        let user = await User.findOne({ username: req.user.username });

        const donationsInDonorDb = await Donations.find({ donor_id: user._id });
        const donationsInRecipientDb = await Recipients.find({ donor_id: user._id });
        const donations = [...donationsInDonorDb, ...donationsInRecipientDb];
        const donationsCount = await Donations.countDocuments({ donor_id: user._id }) + await Recipients.countDocuments({ donor_id: user._id });
        const requestsCount = await Recipients.countDocuments({ recipient_id: user._id }) + await Donations.countDocuments({ recipient_id: user._id });
        const details = {
            donations,
            donationsCount,
            requestsCount,
        }
        res.json({ details });

    } catch (error) {
        console.error('Error fetching user and donation data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteUserById = async (req, res) => {
    try {
        const { enteredpassword, originalpassword } = req.body;
        const isPasswordValid = (enteredpassword === originalpassword);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        const deletedDetail = await User.findByIdAndDelete({ _id: req.headers.user_id });
        if (!deletedDetail) {
            return res.status(400).json({ message: 'User Not Found' });
        }
        res.json({ message: 'User removed successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { createUser, loginUser, updateUser, getUserByName, getuserdata, getUserById, deleteUserById };
