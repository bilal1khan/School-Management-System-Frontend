import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AssignTeacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(0);
  const [selectedClassroom, setSelectedClassroom] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTeachersAndClassrooms = async () => {
      try {
        const teachersRes = await axios.get('https://school-management-system-backend-7vn2.onrender.com/api/principal/teachers');
        const classroomsRes = await axios.get('https://school-management-system-backend-7vn2.onrender.com/api/principal/classrooms'); // Assuming the route for fetching classrooms

        const availableTeachers = teachersRes.data.filter(teacher => !teacher.classroomId);
        const availableClassrooms = classroomsRes.data.filter(classroom => !classroom.teacherId);

        setTeachers(availableTeachers);
        setClassrooms(availableClassrooms);
      } catch (error) {
        setMessage('Failed to load data');
        toast.error('Failed to load data');
        console.error(error);
      }
    };

    fetchTeachersAndClassrooms();
  }, []);

  const handleAssign = async () => {
    if (selectedTeacher && selectedClassroom) {
      try {
        await axios.post('https://school-management-system-backend-7vn2.onrender.com/api/principal/assign-teacher', {
          teacherId: selectedTeacher,
          classroomId: selectedClassroom,
        });
        setMessage('Teacher assigned successfully!');
        toast.success('Teacher assigned successfully!');
      } catch (error) {
        setMessage('Failed to assign teacher');
        toast.error('Failed to assign teacher');
        console.error(error);
      }
    } else {
      setMessage('Please select both a teacher and a classroom');
      toast.warn('Please select both a teacher and a classroom');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-md">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6 text-center">Assign Teacher to Classroom</h2>

      {message && (
        <div className={`p-4 mb-4 ${message.includes('successfully') ? 'bg-green-100' : 'bg-red-100'} text-center`}>
          {message}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Select Teacher:</label>
        <select
          className="block w-full p-2 border border-gray-300 rounded-md"
          value={selectedTeacher}
          onChange={(e) => setSelectedTeacher(e.target.value)}
        >
          <option value="" >Select a teacher</option>
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.name} ({teacher.user.email})
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Select Classroom:</label>
        <select
          className="block w-full p-2 border border-gray-300 rounded-md"
          value={selectedClassroom}
          onChange={(e) => setSelectedClassroom(e.target.value)}
        >
          <option value="" >Select a classroom</option>
          {classrooms.map((classroom) => (
            <option key={classroom.id} value={classroom.id}>
              {classroom.name}
            </option>
          ))}
        </select>
      </div>

      <button
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        onClick={handleAssign}
      >
        Assign Teacher
      </button>
    </div>
  );
};

export default AssignTeacher;
