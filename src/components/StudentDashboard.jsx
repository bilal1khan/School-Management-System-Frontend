import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentDashboard = () => {
  const [classmates, setClassmates] = useState([]);
  

  useEffect(() => {
    axios.get('https://school-management-system-backend-7vn2.onrender.com/api/student/classmates').then((response) => setClassmates(response.data));
    
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>
      <div>
        <h2 className="text-xl font-bold mb-4">Your Classmates</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b py-2">Name</th>
              <th className="border-b py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {classmates.map((student) => (
              <tr key={student.id}>
                <td className="border-b py-2">{student.name}</td>
                <td className="border-b py-2">{student.user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDashboard;
