import { NavLink } from 'react-router-dom';

const Choice = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 p-6 flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-3xl p-8 max-w-4xl w-full">
                <div className="flex flex-col md:flex-row items-center">
                    <img src="images/home.png" className="w-32 h-32 object-contain mb-6 md:mb-0" alt="Home" />
                    <div className="text-center md:text-left md:ml-6">
                        <h1 className="text-4xl font-bold text-blue-700 mb-4">Interested in Sharing?</h1>
                        <p className="text-2xl text-blue-500 mb-4">Browse room sharing options</p>
                        <div className="flex flex-col md:flex-row justify-center md:justify-start items-center space-y-4 md:space-y-0 md:space-x-4">
                            <NavLink to='/rooms'>
                                <img className="w-full md:w-56 lg:w-64 h-auto rounded-3xl shadow-lg transform hover:scale-105 transition-transform duration-300" src="images/one.png" alt="Room Option 1" />
                            </NavLink>
                            <NavLink to='/rooms'>
                                <img className="w-full md:w-56 lg:w-64 h-auto rounded-3xl shadow-lg transform hover:scale-105 transition-transform duration-300" src="images/two.png" alt="Room Option 2" />
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Choice;
