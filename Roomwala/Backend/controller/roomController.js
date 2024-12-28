import Room from "../models/roomsmodel.js";


const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find({});
        res.json(rooms);
    } catch (error) {
        console.log(error);
    }
};


const getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        res.json(room);
    } catch (error) {
        console.log(error);
    }
};

const searchRooms = async (req,res) => {
    console.log("Searching products...");
    try {
        let query = req.query.q;
        const products = await Room.find({
            $or: [
                { pgname: { $regex: query, $options: "i" } },
                { address: { $regex: query, $options: "i" } },
                { city: { $regex: query, $options: "i" } },
                { availablefor: { $regex: query, $options: "i" } }
            ]
        }).limit(10); // Limit results for performance
        // return products;
        res.json(products);
    } catch (error) {
        console.error("Error searching products:", error);
    }
};


const createRoom = async (req, res) => {
    try {
        const room = new Room(req.body);
        await room.save();
        res.json(room);
    } catch (error) {
        console.log(error);
    }
};

const updateRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        console.log(room);
        if (room) {
            room.pgname = req.body.pgname || room.pgname;
            room.price = req.body.price || room.price;
            room.description = req.body.description || room.description;
            room.address = req.body.address || room.address;
            room.city = req.body.city || room.city;
            room.state = req.body.state || room.state;
            room.category = req.body.category || room.category;
            room.roomPic = req.body.roomPic || room.roomPic;
            room.facilities = req.body.facilities || room.facilities;
            room.ratings = req.body.ratings || room.ratings;
            room.totalRatings = req.body.totalRatings || room.totalRatings;
            room.reviews = req.body.reviews || room.reviews;

            const updatedRoom = await room.save();
            res.json(updatedRoom);
        }
    } catch (error) {
        console.log(error);
    }
};

const deleteRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (room) {
            // await room.remove();
            res.json({ message: "Room removed" });
        }
    } catch (error) {
        console.log(error);
    }
};

export { getRooms, getRoomById, createRoom, updateRoom, deleteRoom,searchRooms };