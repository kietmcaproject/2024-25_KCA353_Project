import axios from "axios";
import { useEffect, useState } from "react";

export default function OrganizerPage() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Fetch events created by the organizer (you might need to adjust the endpoint)
        axios.get("/myEvents").then((response) => {
            setEvents(response.data);
        }).catch((error) => {
            console.error("Error fetching events:", error);
        });
    }, []);

    return (
        <div className="mt-1 flex flex-col">
            <h1 className="text-xl font-bold mb-4">My Events</h1>
            <div className="mx-10 my-5 grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:mx-5">
                {events.length > 0 && events.map((event) => (
                    <div className="bg-white rounded-xl p-4" key={event._id}>
                        <h2 className="font-bold text-lg">{event.title}</h2>
                        {/* Display other event details here */}
                        <p>{event.description}</p>
                        {/* Add buttons for editing or deleting the event */}
                    </div>
                ))}
                {events.length === 0 && (
                    <p>No events found.</p>
                )}
            </div>
        </div>
    );
}