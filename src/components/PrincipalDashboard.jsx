import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PrincipalDashboard = () => {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  const navigate = useNavigate();

  

  useEffect(() => {
    axios.get('https://school-management-system-backend-7vn2.onrender.com/api/principal/teachers').then((response) => setTeachers(response.data));
    axios.get('https://school-management-system-backend-7vn2.onrender.com/api/principal/students').then((response) => setStudents(response.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Principal Dashboard</h1>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Teachers</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b py-2">Name</th>
                <th className="border-b py-2">Email</th>
                
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td className="border-b py-2">{teacher.name}</td>
                  <td className="border-b py-2">{teacher.user.email}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Students</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b py-2">Name</th>
                <th className="border-b py-2">Email</th>
                
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="border-b py-2">{student.name}</td>
                  <td className="border-b py-2">{student.user.email}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PrincipalDashboard;
