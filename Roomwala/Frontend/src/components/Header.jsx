import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { TbSearch } from "react-icons/tb";
import { FcCallback } from "react-icons/fc";

const Header = ({ token, logout, isFilterVisible, setFilterVisibility }) => {
    const [showSearch, setShowSearch] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };

    let debounceTimer;
    function searchProducts(searchtext) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(async() => {
            let data = await fetch(`${import.meta.env.VITE_HOST}/api/v1/room/roomsearch?q=${searchtext}`)
                let jsondata = await data.json();
                setSearchResults(jsondata);
                // .then(data => setSearchResults(data))
                // .catch(err => console.error(err));
        }, 600);
    };

    return (
        <>
            <div style={{ backgroundColor: "#40c4f4" }} className="flex sticky z-50 top-0 justify-between items-center p-1 text-black">
                <div className="flex items-center">
                    <NavLink to="/">
                        <img src="../logo/logo.png" className="w-14 ml-1" alt="Logo" />
                    </NavLink>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="hidden md:flex items-center space-x-2">
                        <div className="relative group">
                        <input type="text" onChange={(e) => {e.target.value.length >=2 ? searchProducts(e.target.value): setSearchResults([])}} className="w-64 p-2 rounded" />
                        <div className="absolute bg-white text-black shadow-lg rounded-lg w-48 hidden group-hover:block"> 
                        {searchResults.map((roomdata)=>(<NavLink to={`/room/${roomdata._id}`} key={roomdata._id} className="block w-full text-left px-4 py-2 border-b border-gray-200 hover:bg-gray-200">{roomdata.pgname}</NavLink>))}
                        </div>
                    </div>
                        <button className="p-2 bg-blue-500 text-white rounded">Search</button>
                    </div>
                    

                    <div className="md:hidden flex items-center">
                        <button className="p-2 bg-blue-500 text-white rounded" onClick={toggleSearch}>
                            <TbSearch className='w-6 h-6' />
                        </button>
                    </div>
                    {showSearch && (
                        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 p-4">
                            <div className="bg-white p-4 rounded w-full max-w-lg">
                                <input onChange={(e) => {e.target.value.length >=2 ? searchProducts(e.target.value): setSearchResults([])}} type="text" className="w-full p-2 rounded" />
                                
                                <button className="mt-2 p-2 bg-blue-500 text-white rounded" onClick={toggleSearch}>close</button>
                                {searchResults.map((roomdata)=>(<NavLink to={`/room/${roomdata._id}`} key={roomdata._id} className="block w-full text-left px-4 py-2 border-b border-gray-200 hover:bg-gray-200">{roomdata.pgname}</NavLink>))}
                            </div>
                        </div>
                    )}
                    <div className="relative group">
                        <div className="p-2 bg-blue-500 text-white rounded-full cursor-pointer">
                            <img src="../images/contact us.png" className="w-8 h-8" alt="Contact Us" />
                        </div>
                        <div className="absolute p-3 drop-shadow-md shadow-slate-600 top-12 right-0 bg-white text-black shadow-lg rounded-lg w-48 hidden group-hover:block"> <h3 className="text-lg font-semibold mb-2">CONTACT US</h3> <p className="text-sm">Helpdesk | 9:30 AM to 6:30 PM (Mon-Sun)</p> <div className='flex'><FcCallback className='text-2xl mr-2 mt-1' /><a className="text-lg font-bold" href="tel:+919798305771">9798305771</a></div> <p className="text-sm mt-2">For International Users</p> <a href="tel:+919798305771" className="text-lg font-bold">+91-9798305771</a> <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg">Request a Call Back</button> <a href="#" className="text-blue-500 text-sm mt-2 block">To check all the FAQ click here</a> </div>
                    </div>


                    {token ? (<div className="relative group">
                        <img src="../images/login.png" alt="User Profile" className="w-11 h-11 rounded-full cursor-pointer" />
                        <div className="absolute top-12 right-0 bg-white text-black shadow-lg rounded-lg w-48 hidden group-hover:block"> <NavLink to='/account' className="block w-full text-left px-4 py-2 border-b border-gray-200 hover:bg-gray-200">Account</NavLink> <NavLink to='/orders' className="block w-full text-left px-4 py-2 border-b border-gray-200 hover:bg-gray-200">My Orders</NavLink> <button onClick={logout} className="block w-full text-left px-4 py-2 hover:bg-gray-200">Logout</button> </div>
                    </div>) : (<NavLink to='/login'><img src="../images/login.png" alt="User Profile" className="w-12 h-12 rounded-full cursor-pointer" /></NavLink>)}

                    <button className='md:hidden' onClick={() => { setFilterVisibility(!isFilterVisible) }}><img src="../images/menu1.png" className="w-8 h-8" alt="Menu" /></button>
                </div>
            </div>
            <div>
                <aside className={`md:w-1/4 md:hidden z-40 p-4  bg-white shadow-md h-full right-0 overflow-y-auto ${isFilterVisible ? 'block' : 'hidden'} md:block fixed md:relative top-0`}>
                    <h2 className="text-2xl font-bold mb-4">Filters</h2>
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Popular Locations</h3>
                        <input type="text" placeholder="Search.." className="w-full p-2 border border-gray-300 rounded mb-4" />
                        <ul>
                            <li className="mb-2"><a href="#" className="text-blue-600 hover:underline">Mahipalpur</a></li>
                            <li className="mb-2"><a href="#" className="text-blue-600 hover:underline">New Delhi Railway Station</a></li>
                            <li className="mb-2"><a href="#" className="text-blue-600 hover:underline">Paharganj</a></li>
                            <li className="mb-2"><a href="#" className="text-blue-600 hover:underline">Karol Bagh</a></li>
                            <li className="mb-2"><a href="#" className="text-blue-600 hover:underline">Dwarka, New Delhi</a></li>
                            <li className="mb-2"><a href="#" className="text-blue-600 hover:underline">+ View More</a></li>
                        </ul>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Price Range</h3>
                        <input type="range" min="500" max="5000" step="100" className="w-full" />
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Room Type</h3>
                        <div className="flex items-center mb-4">
                            <input type="checkbox" id="boys" className="mr-2" />
                            <label htmlFor="boys">Boys</label>
                        </div>
                        <div className="flex items-center mb-4">
                            <input type="checkbox" id="girls" className="mr-2" />
                            <label htmlFor="girls">Girls</label>
                        </div>
                        <div className="flex items-center mb-4">
                            <input type="checkbox" id="private" className="mr-2" />
                            <label htmlFor="private">Private Room</label>
                        </div>
                        <div className="flex items-center mb-4">
                            <input type="checkbox" id="sharing" className="mr-2" />
                            <label htmlFor="sharing">Sharing Room</label>
                        </div>
                    </div>
                </aside>
            </div>
        </>
    );
};

export default Header;