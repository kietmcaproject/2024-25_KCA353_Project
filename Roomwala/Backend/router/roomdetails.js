import express from 'express';
import 'dotenv/config';
import { getRooms, getRoomById, createRoom, updateRoom, deleteRoom ,searchRooms} from '../controller/roomController.js';

const router = express.Router();

// router.get('/', (req, res) => {
//     res.send(`<h1>Hello ${req.ip}, welcome to the Roomwala Backend Server!</h1>`);
// });

router.get('/roomdetails', getRooms);
router.get('/roomsearch', searchRooms);

router.get('/roomdetails/:id', getRoomById);

router.post('/roomdetails', createRoom);

router.put('/roomdetails/:id', updateRoom);

router.delete('/roomdetails/:id', deleteRoom);

export default router;
