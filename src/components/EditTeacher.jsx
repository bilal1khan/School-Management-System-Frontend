import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditTeacher = ({ teacherId }) => {
  const [teacher, setTeacher] = useState({});
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/teacher/${teacherId}`);
        setTeacher(response.data);
        setName(response.data.name);
      } catch (error) {
        console.error('Error fetching teacher:', error);
      }
    };

    fetchTeacher();
  }, [teacherId]);

  const handleSave = async () => {
    try {
      const response = await axios.put(`https://school-management-system-backend-7vn2.onrender.com/api/principal/update-teacher/${teacherId}`, { name });
      alert('Teacher updated successfully');
      setTeacher(response.data);
    } catch (error) {
      console.error('Error updating teacher:', error);
      alert('Error updating teacher');
    }
  };

  return (
    <div>
      <h2>Edit Teacher</h2>
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

export default EditTeacher;
