import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsArrowRightShort } from 'react-icons/bs';
import { BiLike } from 'react-icons/bi';

export default function AttendeePage() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Fetch events available for attendees
        axios.get("/createEvent")
            .then((response) => {
                setEvents(response.data);
            })
            .catch((error) => {
                console.error("Error fetching events:", error);
            });
    }, []);
    
    const handleLike = (eventId) => {
        axios.post(`/event/${eventId}/like`)
            .then((response) => {
                setEvents((prevEvents) =>
                    prevEvents.map((event) =>
                        event._id === eventId
                            ? { ...event, likes: event.likes + 1 }
                            : event
                    )
                );
                console.log("Liked event", response);
            })
            .catch((error) => {
                console.error("Error liking event", error);
            });
    };

    return (
        <div className="mt-1 flex flex-col">
            <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>
            <div className="mx-10 my-5 grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:mx-5">
                {events.length > 0 ? (
                    events.map((event) => (
                        <div className="bg-white rounded-xl relative" key={event._id}>
                            <div className='rounded-tl-[0.75rem] rounded-tr-[0.75rem] rounded-br-[0] rounded-bl-[0] object-fill aspect-16:9'>
                                {event.image && (
                                    <img
                                        src={`http://localhost:4000/api/${event.image}`}
                                        alt={event.title}
                                        width="300" 
                                        height="200" 
                                        className="w-full h-full"
                                    />
                                )}
                                <div className="absolute flex gap-4 bottom-[240px] right-8 md:bottom-[20px] md:right-3 lg:bottom-[250px] lg:right-4 sm:bottom-[260px] sm:right-3">
                                    <button onClick={() => handleLike(event._id)}>
                                        <BiLike className="w-auto h-12 lg:h-10 sm:h-12 md:h-10 bg-white p-2 rounded-full shadow-md transition-all hover:text-primary" />
                                    </button>
                                </div>
                            </div>

                            <div className="m-2 grid gap-2">
                                <div className="flex justify-between items-center">
                                    <h1 className="font-bold text-lg mt-2">{event.title.toUpperCase()}</h1>
                                    <div className="flex gap-2 items-center mr-4 text-red-600"> 
                                        <BiLike /> {event.likes}
                                    </div>
                                </div>

                                <div className="flex text-sm flex-nowrap justify-between text-primarydark font-bold mr-4">
                                    <div>{new Date(event.eventDate).toLocaleDateString()}, {event.eventTime}</div>
                                    <div>{event.ticketPrice === 0 ? 'Free' : 'Rs. ' + event.ticketPrice}</div>
                                </div>

                                <div className="text-xs flex flex-col flex-wrap truncate-text">{event.description}</div>
                                <Link to={'/event/' + event._id} className="flex justify-center">
                                    <button className="primary flex items-center gap-2">Book Ticket<BsArrowRightShort className="w-6 h-6" /></button>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No upcoming events found.</p>
                )}
            </div>
        </div>
    );
}
