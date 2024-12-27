import React, { useState, useEffect } from "react";

export default function TeamRegistrationsTable() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        let response = await fetch(
          `${process.env.REACT_APP_URL}/api/v1/team-registrations`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem("token"),
            },
          }
        );
        response = await response.json();
        console.log(response);
        setRegistrations(response.registrations);
        setLoading(false);
      } catch (err) {
        setError("Failed to load team registrations");
        setLoading(false);
      }
    };
    fetchRegistrations();
  }, []);

  console.log(registrations);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Team Registrations</h1>
      {registrations == null ? (
        <div className="text-center text-gray-500">No registrations found.</div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Team Name</th>
                <th className="border px-4 py-2">Event</th>
                <th className="border px-4 py-2">Team Leader</th>
                <th className="border px-4 py-2">Team Members</th>
                <th className="border px-4 py-2">Registration Date</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((registration) => (
                <tr key={registration._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">
                    {registration.teamName || "N/A"}
                  </td>
                  <td className="border px-4 py-2">
                    {registration.event_id?.eventName || "N/A"}
                  </td>
                  <td className="border px-4 py-2">
                    {registration.teamLeader.name} <br />
                    <span className="text-sm text-gray-500">
                      {registration.teamLeader.email}
                    </span>
                  </td>
                  <td className="border px-4 py-2">
                    <ul className="list-disc pl-5">
                      {registration.teamMembers.map((member, index) => (
                        <li key={index}>
                          {member.name} ({member.email})
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(
                      registration.registrationDate
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
