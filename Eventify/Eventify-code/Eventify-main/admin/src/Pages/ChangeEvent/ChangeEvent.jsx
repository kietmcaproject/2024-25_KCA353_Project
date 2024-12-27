// import React, { useEffect, useState } from "react";
// import Sidebar from "../../Components/Sidebar";
// import { Menu } from "lucide-react";
// import EditEvent from "../../Components/EditEvent";

// function ChangeEvents() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1024) {
//         setSidebarOpen(false);
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);
//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//       <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
//         <header className="bg-white shadow">
//           <div className="py-4 px-4 flex justify-between items-center">
//             <button
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               className="text-gray-500 hover:text-gray-600 lg:hidden"
//             >
//               <Menu className="h-6 w-6" />
//             </button>
//             <h1 className="text-xl font-semibold text-gray-800">
//               Change Events
//             </h1>
//           </div>
//         </header>
//         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
//           <EditEvent />
//         </main>
//       </div>
//     </div>
//   );
// }

// export default ChangeEvents;
import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar";
import { Menu } from "lucide-react";
import EditEvent from "../../Components/EditEvent";

function ChangeEvents() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-100 via-purple-50 to-pink-100">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        {/* Header */}
        <header className="bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md">
          <div className="py-4 px-4 flex justify-between items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-500 hover:text-gray-600 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">Change Events</h1>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          <div className="p-6 bg-white shadow-md rounded-lg border-t-4 border-purple-600">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Edit Event Details
            </h2>
            <p className="text-gray-600 mb-6">
              Use the form below to make changes to an existing event.
            </p>
            <EditEvent />
          </div>
        </main>
      </div>
    </div>
  );
}

export default ChangeEvents;

