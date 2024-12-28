import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CiStar } from "react-icons/ci";


const RoomDetails = () => {
    const { roomid } = useParams();
    const [roomdata, setRoomdata] = useState({});

    const roomcal = async () => {
        const response = await fetch(`${import.meta.env.VITE_HOST}/api/v1/room/roomdetails/${roomid}`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }
        );
        const parshdata = await response.json();
        setRoomdata(parshdata);
    }

    useEffect(() => {
        roomcal()
    }, [roomid]);

    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <main className="mt-6">
                <div className="bg-white p-6 rounded shadow-md mb-6">
                    <div className="flex md:flex-row flex-col">
                        <div className="md:w-1/3 w-full mb-4 md:mb-0">
                            <Carousel>
                                {roomdata.roomPic?.map((image, index) => (
                                    <Carousel.Item key={index}>
                                        <img className="d-block w-100 rounded" src={image} alt={`Slide ${index}`} />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>
                        <div className="md:w-2/3 w-full md:pl-6">
                            <h2 className="text-2xl font-bold mb-2">{`${roomdata.pgname} ${roomdata.city}`}</h2>
                            <h2 className="text-lg font-bold mb-2">{`${roomdata.address}`}</h2>
                            <p className="text-gray-600 mb-2">{roomdata.description}</p>
                            <div className="flex items-center mb-2">
                                <span className="text-green-500 font-bold text-2xl">{roomdata.ratings}</span> <CiStar className='ml-2 text-green-500 font-bold text-3xl' />
                                <span className="ml-2 text-gray-600">({roomdata.totalRatings} Ratings) - Very Good</span>
                            </div>
                            {/* <div className="flex items-center mb-2 flex-wrap">
                                {roomdata.facilities[0] ? <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded mr-2 mb-2">{roomdata?.facilities[0]}</span> : null}
                                {roomdata.facilities[1] ? <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded mr-2 mb-2">{roomdata?.facilities[1]}</span> : null}
                                {roomdata.facilities[2] ? <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded mr-2 mb-2">{roomdata?.facilities[2]}</span> : null}
                                <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded mb-2">+ {(roomdata?.facilities.length) + ' more'}</span>
                            </div> */}
                            <div className='flex items-center mb-2 flex-wrap text-xl font-bold font-sans'>
                                Amenities:
                            </div>
                            <div className="flex items-center mb-2 flex-wrap"> {roomdata.facilities?.map((amenity, index) => (<span key={index} className="bg-gray-200 text-gray-800 px-2 py-1 rounded mr-2 mb-2">{amenity}</span>))} <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded mb-2">+ {roomdata.facilities?.length} more</span> </div>
                            <div className='flex items-center mb-2 flex-wrap text-xl font-bold font-sans'>
                                Available For:
                            </div>
                            <div className="flex items-center mb-2 flex-wrap"> {roomdata.availablefor} </div>
                            <div className="flex items-center mb-2">
                                <span className="text-red-500 font-bold">{Math.floor(Math.random() * 5)} people booked this hotel today</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <span className="text-2xl font-bold text-gray-800">₹{roomdata.price}</span>
                            </div>
                            <div className="flex space-x-4 mt-4">
                                <NavLink to={`/checkout?roomid=${roomdata._id}`} className="bg-green-500 text-white px-4 py-2 rounded shadow">Book Now</NavLink>
                            </div>
                        </div>
                    </div>
                </div>

            </main >
        </div >
    );
};

export default RoomDetails;
