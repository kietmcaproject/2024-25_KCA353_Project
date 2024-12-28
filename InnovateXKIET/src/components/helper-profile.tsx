"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import PrivateRoute from '@/components/privateRoute';
import Image, { StaticImageData } from 'next/image';
import profileImage from '@/public/assests/authImage/school-supplies-with-laptop-tablet.jpg';

interface Experience {
  id: number;
  company: string;
  role: string;
  duration: string;
}

interface ProfileProps {
  name: string;
  email: string;
  registerNumber: string;
  degree: string;
  batch: number;
  college: string;
  profileImage: StaticImageData;
  level: number;
  experiences: Experience[];
}

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [newExperience, setNewExperience] = useState<Experience>({
    id: experiences.length + 1,
    company: '',
    role: '',
    duration: '',
  });

  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewExperience({ ...newExperience, [name]: value });
  };

  const handleAddExperience = () => {
    setExperiences([...experiences, newExperience]);
    setNewExperience({
      id: experiences.length + 2, // Ensures the ID is unique for the next entry
      company: '',
      role: '',
      duration: '',
    });
    setIsEditing(false);
  };

  return (
    <PrivateRoute>
      <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="max-w-4xl w-full bg-white shadow-2xl rounded-lg p-8 overflow-hidden transform transition-transform duration-500 hover:scale-105">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold text-gray-900">Profile</h2>
            <p className="text-sm text-gray-500">Last Updated on 22/09/2024 | 04:18 PM</p>
          </div>

          {/* Banner & Profile Image */}
          <div className="relative">
            <div className="h-32 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 rounded-lg"></div>
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

          {/* Profile Details */}
          <div className="mt-20 text-center">
            <h3 className="text-4xl font-extrabold text-gray-900">Profile Name</h3>
            <p className="text-sm text-gray-600 mt-2">email@example.com</p>

            {/* Profile Stats */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
              <div className="bg-gray-100 p-4 rounded-lg shadow">
                <p className="font-semibold">Register Number:</p>
                <p className="mt-1 text-lg">123456</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow">
                <p className="font-semibold">Degree:</p>
                <p className="mt-1 text-lg">B.Sc</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow">
                <p className="font-semibold">Batch:</p>
                <p className="mt-1 text-lg">2024</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow">
                <p className="font-semibold">College:</p>
                <p className="mt-1 text-lg">XYZ University</p>
              </div>
            </div>

            {/* Level and Skill Progress */}
            <div className="mt-10 flex justify-center items-center space-x-8">
              <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm">Beginner</span>
              <div className="text-center">
                <span className="text-xl font-bold text-gray-800">Level 1</span>
                <p className="text-xs text-gray-500">of 5</p>
              </div>
            </div>

            {/* Experience Section */}
            <div className="mt-12 text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Experience</h3>
              <ul>
                {experiences.map((exp) => (
                  <li key={exp.id} className="mb-4">
                    <div className="bg-gray-50 p-4 rounded-lg shadow">
                      <p className="text-lg font-semibold">{exp.role}</p>
                      <p className="text-gray-600">{exp.company}</p>
                      <p className="text-gray-400 text-sm">{exp.duration}</p>
                    </div>
                  </li>
                ))}
              </ul>

              {isEditing ? (
                <div className="mt-6">
                  <input
                    type="text"
                    name="company"
                    placeholder="Company"
                    className="mb-2 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    value={newExperience.company}
                    onChange={handleExperienceChange}
                  />
                  <input
                    type="text"
                    name="role"
                    placeholder="Role"
                    className="mb-2 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    value={newExperience.role}
                    onChange={handleExperienceChange}
                  />
                  <input
                    type="text"
                    name="duration"
                    placeholder="Duration"
                    className="mb-2 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    value={newExperience.duration}
                    onChange={handleExperienceChange}
                  />
                  <button
                    className="w-full bg-indigo-600 text-white py-2 rounded-lg shadow hover:bg-indigo-700"
                    onClick={handleAddExperience}
                  >
                    Add Experience
                  </button>
                </div>
              ) : (
                <button
                  className="w-full mt-4 bg-indigo-500 text-white py-2 rounded-lg shadow hover:bg-indigo-600"
                  onClick={() => setIsEditing(true)}
                >
                  Add New Experience
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default ProfilePage;
