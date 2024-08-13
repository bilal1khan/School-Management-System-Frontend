import React from 'react';
import axios from 'axios';

const DeleteTeacher = ({ teacherId }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`https://school-management-system-backend-7vn2.onrender.com/api/principal/delete-teacher/${teacherId}`);
      alert('Teacher deleted successfully');
      // Optionally, redirect or update state
    } catch (error) {
      console.error('Error deleting teacher:', error);
      alert('Error deleting teacher');
    }
  };

  return (
    <div>
      <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
        Delete Teacher
      </button>
    </div>
  );
};

export default DeleteTeacher;
