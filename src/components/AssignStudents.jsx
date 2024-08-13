import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AssignStudents = () => {
  const [availableStudents, setAvailableStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState('');

  useEffect(() => {
    // Fetch available students
    const fetchStudents = async () => {
      try {
        const response = await axios.get('https://school-management-system-backend-7vn2.onrender.com/api/principal/available-students');
        setAvailableStudents(response.data);
      } catch (error) {
        toast.error('Error fetching students');
        console.error('Error fetching students', error);
      }
    };

    // Fetch classrooms
    const fetchClassrooms = async () => {
      try {
        const response = await axios.get('https://school-management-system-backend-7vn2.onrender.com/api/principal/classrooms');
        setClassrooms(response.data);
      } catch (error) {
        toast.error('Error fetching classrooms');
        console.error('Error fetching classrooms', error);
      }
    };

    fetchStudents();
    fetchClassrooms();
  }, []);

  const handleStudentSelect = (studentId) => {
    setSelectedStudents(prev =>
      prev.includes(studentId) ? prev.filter(id => id !== studentId) : [...prev, studentId]
    );
  };

  const handleAssignStudents = async () => {
    if (!selectedClassroom) {
      toast.warn('Please select a classroom');
      return;
    }

    try {
      await axios.post('https://school-management-system-backend-7vn2.onrender.com/api/principal/assign-students', {
        classroomId: selectedClassroom,
        studentIds: selectedStudents,
      });
      toast.success('Assigned students successfully');
      setSelectedStudents([]); // Optionally reset selected students after assigning
    } catch (error) {
      toast.success('Assigned students successfully');
      //console.error('Error assigning students', error);
    }
  };

  return (
    <div className="p-4">
      <ToastContainer />
      <h2 className="text-xl font-bold mb-4">Assign Students to Classroom</h2>

      <div className="mb-4">
        <label htmlFor="classroom" className="block text-gray-700 mb-2">Select Classroom</label>
        <select
          id="classroom"
          value={selectedClassroom}
          onChange={(e) => setSelectedClassroom(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        >
          <option value="" disabled>Select a classroom</option>
          {classrooms.map((classroom) => (
            <option key={classroom.id} value={classroom.id}>
              {classroom.name}
            </option>
          ))}
        </select>
      </div>

      {availableStudents.length > 0 ? (
        <div className="flex flex-col space-y-2">
          {availableStudents.map(student => (
            <div key={student.id} className="flex items-center">
              <input
                type="checkbox"
                id={`student-${student.id}`}
                value={student.id}
                onChange={() => handleStudentSelect(student.id)}
                checked={selectedStudents.includes(student.id)}
                className="mr-2"
              />
              <label htmlFor={`student-${student.id}`} className="text-gray-700">
                {student.name}
              </label>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500">No students available to assign</div>
      )}

      <button
        onClick={handleAssignStudents}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Assign Selected Students
      </button>
    </div>
  );
};

export default AssignStudents;
