import Order from '../models/orders.js';
import User from '../models/user.js';
import 'dotenv/config';
import jwt from 'jsonwebtoken';


const createOrder = async (req, res) => {
    try {
        const { userid,username, shippingAddress, orderItems,phoneNumber, totalPrice,orderid} = req.body;
        if (orderItems.length === 0) {
        res.status(400).json({ message: "No order items" });
        } else {
        const order = new Order({
            username,
            userid,
            orderItems,
            orderid,
            shippingAddress,
            phoneNumber,
            totalPrice,
        });
    
        const createdOrder = await order.save();
    
        res.status(201).json({success:true, createdOrder});
        }
    } catch (error) {
        res.status(400).json({ message: "error.message" });
    }
    };

const getorderdetails = async (req, res) => {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(400).json({ success: false, message: 'Invalid User' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const emailtoken = decoded.email;
        const user = await User.findOne({ email: emailtoken });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const orders = await Order.find({userid:user._id});
        res.status(200).json({success:true,orders});
    } catch (error) {
        res.status(400).json({ message: "error.message" });
    }
    };


export { createOrder ,getorderdetails};