// import React from "react";
// import { useState, useEffect } from "react";
// import Sidebar from "../../Components/Sidebar";
// import { Menu } from "lucide-react";
// import RegistrationsTable from "../../Components/RegistrationsTable";

// export default function Registrations() {
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
//               Registrations
//             </h1>
//           </div>
//         </header>
//         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
//           <RegistrationsTable />
//         </main>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar";
import { Menu } from "lucide-react";
import RegistrationsTable from "../../Components/RegistrationsTable";

export default function Registrations() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [registrations, setRegistrations] = useState([]);

  // Fetching registration data from an API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/registrations");
        const data = await response.json();
        setRegistrations(data);
      } catch (error) {
        console.error("Error fetching registration data:", error);
      }
    };
    fetchData();
  }, []);

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
    <div className="flex h-screen bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        <header className="bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md">
          <div className="py-4 px-4 flex justify-between items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-500 hover:text-gray-600 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">Registrations</h1>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          <RegistrationsTable registrations={registrations} />
        </main>
      </div>
    </div>
  );
}
