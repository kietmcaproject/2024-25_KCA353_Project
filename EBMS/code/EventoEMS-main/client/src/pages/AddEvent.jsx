import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function AddEvent () {
    const {user} = useContext(UserContext);
    const [formData, setFormData] = useState({
        owner: user? user.name: "",
        title: "",
        description: "",
        organizedBy: "",
        eventDate: "",
        eventTime: "",
        venue: "",
        maxCapacity: "",
        ticketPrice: 0,
        image: '',
        likes: 0
    });

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setFormData((prevState) => ({
            ...prevState,
            image: file
        }));
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData((prevState) => ({
                ...prevState,
                [name]: files[0]
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("/createEvent", formData).then((response) => {
            console.log("Event posted successfully!", response.data);
        }).catch((error) => {
            console.log("Error posting event!", error);
        });
    };

    return (
        <div className="flex flex-col ml-20 mt-10">
            <div>
                <h1 className="font-bold text-[36px] mb-5">Post an Event</h1>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="flex flex-col gap-5">
                    <label className="flex flex-col">
                        Title:
                        <input type="text" name="title" className="rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none" value={formData.title} onChange={handleChange} />
                    </label>

                    <label className="flex flex-col">
                        Description:
                        <textarea name="description" className="rounded mt-2 pl-5 px-4 py-2 ring-sky-700 ring-2 h-8 border-none" value={formData.description} onChange={handleChange} />
                    </label>

                    <label className="flex flex-col">
                        Organized By:
                        <input type="text" name="organizedBy" className="rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none" value={formData.organizedBy} onChange={handleChange} />
                    </label>

                    <label className="flex flex-col">
                        Event Date:
                        <input type="date" name="eventDate" className="rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none" value={formData.eventDate} onChange={handleChange} />
                    </label>                    

                    <label className="flex flex-col">
                        Event Time:
                        <input type="time" name="eventTime" className="rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none" value={formData.eventTime} onChange={handleChange} />
                    </label>

                    <label className="flex flex-col">
                        Location:
                        <input type="text" name="location" className="rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none" value={formData.location} onChange={handleChange} />
                    </label>                    

                    <label className="flex flex-col">
                        Ticket Price:
                        <input type="number" name="ticketPrice" className="rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none" value={formData.ticketPrice} onChange={handleChange} />
                    </label>                    

                    <label className="flex flex-col">
                        Image:
                        <input type="file" name="image" className="rounded mt-2 pl-5 px-4 py-10 ring-sky-700 ring-2 h-8 border-none" onChange={handleImageUpload} />
                    </label>

                    <button className="primary" type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}