import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewTimetable = ({ role }) => {
    const [timetable, setTimetable] = useState([]);
    const [classroomId, setClassroomId] = useState('');
    const [classrooms, setClassrooms] = useState([]);

    useEffect(() => {
        const fetchClassrooms = async () => {
            if (role === 'PRINCIPAL') {
                try {
                    const response = await axios.get('https://school-management-system-backend-7vn2.onrender.com/api/principal/classrooms');
                    setClassrooms(response.data);
                } catch (error) {
                    console.error('Error fetching classrooms:', error);
                }
            }
        };

        fetchClassrooms();
    }, [role]);

    useEffect(() => {
        const fetchTimetable = async () => {
            try {
                let endpoint = 'https://school-management-system-backend-7vn2.onrender.com/api/teacher/view-timetable'; // Default to teacher
                if (role === 'PRINCIPAL') {
                    endpoint = `https://school-management-system-backend-7vn2.onrender.com/api/principal/view-timetables?classroomId=${classroomId}`;
                } else if (role === 'STUDENT') {
                    endpoint = 'https://school-management-system-backend-7vn2.onrender.com/api/student/timetable';
                }
                const response = await axios.get(endpoint);
                setTimetable(response.data);
            } catch (error) {
                console.error('Error fetching timetable:', error);
            }
        };

        if (role !== 'PRINCIPAL' || classroomId) {
            fetchTimetable();
        }
    }, [role, classroomId]);

    // Helper function to group timetable entries by day
    const groupByDay = (entries) => {
        return entries.reduce((acc, entry) => {
            if (!acc[entry.day]) {
                acc[entry.day] = [];
            }
            acc[entry.day].push(entry);
            return acc;
        }, {});
    };

    const timetableGroupedByDay = groupByDay(timetable);

    return (
        <div className="p-4">
            {role === 'PRINCIPAL' && (
                <div className="mb-4">
                    <label htmlFor="classroom" className="block text-gray-700">Select Classroom</label>
                    <select
                        id="classroom"
                        value={classroomId}
                        onChange={(e) => setClassroomId(e.target.value)}
                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Select Classroom</option>
                        {classrooms.map((classroom) => (
                            <option key={classroom.id} value={classroom.id}>
                                {classroom.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Day</th>
                        <th className="py-2 px-4 border-b">Subject</th>
                        <th className="py-2 px-4 border-b">Start Time</th>
                        <th className="py-2 px-4 border-b">End Time</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(timetableGroupedByDay).map(([day, entries]) => (
                        <React.Fragment key={day}>
                            {entries.map((entry) => (
                                <tr key={entry.id}>
                                    <td className="py-2 px-4 border-b">{day}</td>
                                    <td className="py-2 px-4 border-b">{entry.subject}</td>
                                    <td className="py-2 px-4 border-b">{entry.startTime}</td>
                                    <td className="py-2 px-4 border-b">{entry.endTime}</td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewTimetable;
