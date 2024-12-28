"use client";

import { FeedItem, LeaderboardData } from '@/types';
import React, { useEffect, useState } from 'react';
import { Doughnut, PolarArea } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    RadialLinearScale,
} from 'chart.js';
import PrivateRoute from './privateRoute';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, RadialLinearScale);

export const Leaderboard = () => {
    const [leaderboardData, setLeaderboardData] = useState<LeaderboardData>({
        labels: [],
        datasets: [],
    });
    const [departmentalData, setDepartmentalData] = useState<LeaderboardData>({
        labels: [],
        datasets: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                // Fetch the leaderboard data
                const response = await fetch('/api/leaderboard');
                
                // Parse JSON response
                const { data: dummyData } = await response.json(); // Access the data array inside the response object

                // Confirm that the data is an array
                if (!Array.isArray(dummyData)) {
                    throw new Error('Invalid data format');
                }

                // Prepare leaderboard data for chart
                const leaderboard = {
                    labels: dummyData.map((user: any) => user.name), // Use correct keys
                    datasets: [
                        {
                            label: 'Points',
                            data: dummyData.map((user: any) => user.points), // Use correct keys
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.6)',
                                'rgba(54, 162, 235, 0.6)',
                                'rgba(255, 206, 86, 0.6)',
                                'rgba(75, 192, 192, 0.6)',
                                'rgba(153, 102, 255, 0.6)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                            ],
                            borderWidth: 1,
                        },
                    ],
                };

                setLeaderboardData(leaderboard);

                // Count contributions per department
                const departmentCounts: { [key: string]: number } = {};
                dummyData.forEach((user: any) => {
                    if (departmentCounts[user.department]) {
                        departmentCounts[user.department]++;
                    } else {
                        departmentCounts[user.department] = 1;
                    }
                });

                // Prepare departmental chart data
                const departmentalChartData = {
                    labels: Object.keys(departmentCounts),
                    datasets: [
                        {
                            label: 'Number of Contributions',
                            data: Object.values(departmentCounts),
                            backgroundColor: [
                                'rgba(255, 159, 64, 0.6)',
                                'rgba(75, 192, 192, 0.6)',
                                'rgba(153, 102, 255, 0.6)',
                                'rgba(54, 162, 235, 0.6)',
                                'rgba(255, 99, 132, 0.6)',
                            ],
                            borderColor: [
                                'rgba(255, 159, 64, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 99, 132, 1)',
                            ],
                            borderWidth: 1,
                        },
                    ],
                };

                setDepartmentalData(departmentalChartData);
            } catch (error) {
                console.error('Error fetching leaderboard data:', error);
                setError('Failed to fetch leaderboard data');
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboardData();
    }, []);

    // Loading and Error States
    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-red-500 text-lg">{error}</p>
        </div>
    );

    return (
        <PrivateRoute>
        <div className="mt-8">
            <div className="space-y-3">
                {/* Departmental Chart */}
                <div className="justify-items-center bg-blue-50 p-3 dark:text-white dark:bg-gray-900 rounded-lg ">
                    <h2 className="text-xl p-3 font-bold ">Departmental Chart</h2>
                    <div className="flex justify-center bg-white w-76 h-60 rounded-lg shadow dark:bg-gray-900 dark:border border-white">
                        <Doughnut data={departmentalData} />
                    </div>
                </div>

                {/* Contribution Area Chart */}
                <div className="justify-items-center bg-blue-50 p-3 dark:text-white dark:bg-gray-900 rounded-lg ">
                    <h2 className="text-xl p-3 font-bold">Contribution Area</h2>
                    <div className="flex justify-center bg-white rounded-lg w-76 h-60 shadow dark:bg-gray-900 dark:border border-white">
                        <PolarArea data={leaderboardData} />
                    </div>
                </div>
            </div>
        </div>
    </PrivateRoute>
    );
};
