"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PrivateRoute from "@/components/privateRoute";
import Image from "next/image";
import profileImage from "@/public/assests/authImage/school-supplies-with-laptop-tablet.jpg";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/Redux/store";
import { FaDownload } from "react-icons/fa";

interface Experience {
  id: number;
  company: string;
  role: string;
  duration: string;
  description: string;
}

interface ProfileData {
  username: string;
  email: string;
  registerNumber: string;
  degree: string;
  batch: number;
  college: string;
  level: number;
  experiences: Experience[];
  userId: string;
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(true);
  const [newExperience, setNewExperience] = useState<Experience>({
    id: 0,
    company: "",
    role: "",
    duration: "",
    description: "",
  });

  const [profileData, setProfileData] = useState<ProfileData>({
    username: "",
    email: "",
    registerNumber: "",
    degree: "",
    batch: 0,
    college: "",
    level: 0,
    experiences: [],
    userId: "",
  });

  const [validationError, setValidationError] = useState<string | null>(null);
  const loggedInUserId = useSelector((state: RootState) => state.user.userId);
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  useEffect(() => {
    if (!userId) {
      setError("User ID not found in URL");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/profile?userId=${userId}`);
        if (!res.ok) throw new Error("Failed to fetch profile data");
        const data = await res.json();
        setProfile(data);
        setProfileData(data);
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to load profile. Please try again later.");
      }
    };

    fetchProfile();
  }, [userId]);

  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewExperience({ ...newExperience, [name]: value });
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleAddExperience = async () => {
    if (!profile) {
      setError("Profile data is not loaded yet. Please wait and try again.");
      return;
    }

    if (
      !newExperience.company ||
      !newExperience.role ||
      !newExperience.duration ||
      !newExperience.description
    ) {
      setValidationError("Please fill out all fields before submitting.");
      return;
    }

    setValidationError(null);

    try {
      const updatedProfile = {
        ...profile,
        experiences: [...profile.experiences, newExperience],
      };
      setProfile(updatedProfile);

      // Update backend
      const res = await fetch(`/api/profile?userId=${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ experiences: updatedProfile.experiences }),
      });
      if (!res.ok) throw new Error("Failed to update profile");

      setIsEditing(false);
      setNewExperience({
        id: 0,
        company: "",
        role: "",
        duration: "",
        description: "",
      });
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to update profile. Please try again later.");
    }
  };

  const handleSaveProfile = async () => {
    try {
      const res = await fetch(`/api/profile?userId=${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      });

      if (!res.ok) {
        throw new Error("Failed to update profile");
      }

      setIsEditingProfile(false);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to update profile. Please try again later.");
    }
  };

  const isOwner = profile?.userId === loggedInUserId;

  return (
    <PrivateRoute>
      <div className="flex flex-col lg:w-[1280px] w-auto bg-gray-100 dark:text-white dark:bg-gray-900">
        <div className="p-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold text-gray-900">Profile</h2>
            <p className="text-sm text-gray-500">
              Last Updated on 22/09/2024 | 04:18 PM
            </p>
          </div>

          <div className="relative">
            <div className="h-40 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 rounded-lg"></div>
            <div className="absolute -bottom-16 left-8 w-32 h-32">
              <Image
                src={profileImage}
                alt="Profile Image"
                width={128}
                height={128}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
            </div>
          </div>

          <div className="mt-20">
            <FaDownload className="mr-2" />
            {isEditingProfile ? (
              <>
                {/* Profile fields */}
                <div className="mb-6">
                  <label
                    htmlFor="username"
                    className="block text-sm font-semibold"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={profileData.username}
                    onChange={handleProfileChange}
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                {/* Add other profile fields like email, degree, etc. */}

                <div className="mb-6">
                  <button
                    onClick={handleSaveProfile}
                    className="w-full p-2 bg-blue-500 text-white rounded-md"
                  >
                    Save Profile
                  </button>
                </div>
              </>
            ) : (
              <div>
                <>
                  <div className="p-2">
                    <div className="font-bold text-[30px]">
                      {profile?.username || "N/A"}
                    </div>
                    <div className="text-lg">{profile?.email || "N/A"}</div>
                  </div>
                  <div className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="mb-6">
                        <div className="shadow-md p-6 rounded-md bg-white font-semibold">
                          Register Number: {profile?.registerNumber || "N/A"}
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="shadow-md p-6 rounded-md bg-white font-semibold">
                          Degree: {profile?.degree || "N/A"}
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="shadow-md p-6 rounded-md bg-white font-semibold">
                          Batch: {profile?.batch || "N/A"}
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="shadow-md p-6 rounded-md bg-white font-semibold">
                          College: {profile?.college || "N/A"}
                        </div>
                      </div>

                      {/* <div className="mb-6">
                                            <label htmlFor="level" className="block text-sm font-semibold">Level</label>
                                            <div className="shadow-md p-4 rounded-md bg-white">{profile?.level || 'N/A'}</div>
                                        </div> */}
                    </div>
                  </div>
                </>

                {/* Display Experience Section */}
                <div className="mt-6">
                  <h3 className="text-xl font-semibold">Experience</h3>
                  <ul className="space-y-4 mt-4">
                    {profile?.experiences.map((exp) => (
                      <li
                        key={exp.id}
                        className="bg-white p-4 rounded-lg shadow-md"
                      >
                        <div className="font-bold">{exp.company}</div>
                        <div>{exp.role}</div>
                        <div>{exp.duration}</div>
                        <p>{exp.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Add Experience */}
                {isOwner && !isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-6 p-2 bg-green-500 text-white rounded-lg"
                  >
                    Add Experience
                  </button>
                )}
                {isEditing && (
                  <div className="mt-6">
                    <div className="mb-4">
                      <label
                        htmlFor="company"
                        className="block text-sm font-semibold"
                      >
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={newExperience.company}
                        onChange={handleExperienceChange}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="role"
                        className="block text-sm font-semibold"
                      >
                        Role
                      </label>
                      <input
                        type="text"
                        id="role"
                        name="role"
                        value={newExperience.role}
                        onChange={handleExperienceChange}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="duration"
                        className="block text-sm font-semibold"
                      >
                        Duration
                      </label>
                      <input
                        type="text"
                        id="duration"
                        name="duration"
                        value={newExperience.duration}
                        onChange={handleExperienceChange}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="description"
                        className="block text-sm font-semibold"
                      >
                        Description
                      </label>
                      <input
                        type="text"
                        id="description"
                        name="description"
                        value={newExperience.description}
                        onChange={handleExperienceChange}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>

                    {validationError && (
                      <div className="text-red-500 text-sm">
                        {validationError}
                      </div>
                    )}

                    <div className="mt-4">
                      <button
                        onClick={handleAddExperience}
                        className="w-full p-2 bg-blue-500 text-white rounded-md"
                      >
                        Save Experience
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default ProfilePage;
