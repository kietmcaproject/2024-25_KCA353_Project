import React, { useEffect, useState } from "react";
import { X, Plus, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RegistrationForm = ({ eventId, handleForm }) => {
  const [formData, setFormData] = useState({
    teamName: "",
    teamMembers: [{ name: "", email: "", course: "", branch: "" }],
    teamLeader: { name: "", email: "", course: "", branch: "" },
  });
  const navigate = useNavigate();

  console.log(eventId);

  // useEffect(() => {
  //   setIsOpen(true);
  // }, [eventId]);

  const handleLeaderChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      teamLeader: { ...prev.teamLeader, [name]: value },
    }));
  };

  const handleMemberChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMembers = formData.teamMembers.map((member, i) => {
      if (i === index) {
        return { ...member, [name]: value };
      }
      return member;
    });
    setFormData((prev) => ({ ...prev, teamMembers: updatedMembers }));
  };

  const addMember = () => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: [
        ...prev.teamMembers,
        { name: "", email: "", course: "", branch: "" },
      ],
    }));
  };

  const removeMember = (index) => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    const data = {
      ...formData,
      teamEventId: eventId,
    };
    const token = localStorage.getItem("token");
    console.log(token);

    console.log(data);
    let response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/register-team-event`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(data),
      }
    );
    response = await response.json();
    console.log(response);
    alert(response.message);
    // navigate("/team-events");
    handleForm();
  };

  return (
    <div>
      {/* <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
      >
        <Plus size={20} />
        Create Team
      </button> */}

      <div className="text-black fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white">
            <h2 className="text-xl font-bold">Create Team</h2>
            <button
              onClick={() => {
                handleForm();
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 space-y-6">
            {/* Team Name */}
            <div>
              <label className="block mb-2 font-medium">Team Name</label>
              <input
                type="text"
                value={formData.teamName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    teamName: e.target.value,
                  }))
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>

            {/* Team Leader */}
            <div className="bg-blue-50 p-4 rounded">
              <h3 className="font-medium mb-4">Team Leader</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.teamLeader.name}
                  onChange={handleLeaderChange}
                  className="p-2 border rounded"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.teamLeader.email}
                  onChange={handleLeaderChange}
                  className="p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="course"
                  placeholder="Course"
                  value={formData.teamLeader.course}
                  onChange={handleLeaderChange}
                  className="p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="branch"
                  placeholder="Branch"
                  value={formData.teamLeader.branch}
                  onChange={handleLeaderChange}
                  className="p-2 border rounded"
                  required
                />
              </div>
            </div>

            {/* Team Members */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Team Members</h3>
                <button
                  type="button"
                  onClick={addMember}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add Member
                </button>
              </div>

              {formData.teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="mb-6 p-4 bg-gray-50 rounded relative"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Member {index + 1}</h4>
                    {formData.teamMembers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMember(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash size={20} />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={member.name}
                      onChange={(e) => handleMemberChange(index, e)}
                      className="p-2 border rounded"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={member.email}
                      onChange={(e) => handleMemberChange(index, e)}
                      className="p-2 border rounded"
                      required
                    />
                    <input
                      type="text"
                      name="course"
                      placeholder="Course"
                      value={member.course}
                      onChange={(e) => handleMemberChange(index, e)}
                      className="p-2 border rounded"
                      required
                    />
                    <input
                      type="text"
                      name="branch"
                      placeholder="Branch"
                      value={member.branch}
                      onChange={(e) => handleMemberChange(index, e)}
                      className="p-2 border rounded"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Create Team
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
