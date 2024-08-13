import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditStudent = ({ studentId }) => {
  const [student, setStudent] = useState({});
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/student/${studentId}`);
        setStudent(response.data);
        setName(response.data.name);
      } catch (error) {
        console.error('Error fetching student:', error);
      }
    };

    fetchStudent();
  }, [studentId]);

  const handleSave = async () => {
    try {
      const response = await axios.put(`https://school-management-system-backend-7vn2.onrender.com/api/principal/update-student/${studentId}`, { name });
      alert('Student updated successfully');
      setStudent(response.data);
    } catch (error) {
      console.error('Error updating student:', error);
      alert('Error updating student');
    }
  };

  return (
    <div>
      <h2>Edit Student</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">
        Save Changes
      </button>
    </div>
  );
};

export default EditStudent;
