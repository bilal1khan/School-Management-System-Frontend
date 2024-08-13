import React from 'react';
import axios from 'axios';

const DeleteStudent = ({ studentId }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`https://school-management-system-backend-7vn2.onrender.com/api/principal/delete-student/${studentId}`);
      alert('Student deleted successfully');
      // Optionally, redirect or update state
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('Error deleting student');
    }
  };

  return (
    <div>
      <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
        Delete Student
      </button>
    </div>
  );
};

export default DeleteStudent;
