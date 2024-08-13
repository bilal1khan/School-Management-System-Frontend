import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClassroomForm = () => {
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [days, setDays] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://school-management-system-backend-7vn2.onrender.com/api/principal/create-classroom', {
        name,
        startTime,
        endTime,
        days,
      });
      toast.success('Classroom created successfully!');
      setName('');
      setStartTime('');
      setEndTime('');
      setDays([]);
    } catch (error) {
      toast.error('Failed to create classroom. Please try again.');
    }
  };

  const handleDayChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setDays([...days, value]);
    } else {
      setDays(days.filter((day) => day !== value));
    }
  };

  return (
    <div className="p-6">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-6">Create Classroom</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Classroom Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Start Time</label>
          <input
            type="time"
            className="w-full p-2 border border-gray-300 rounded"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">End Time</label>
          <input
            type="time"
            className="w-full p-2 border border-gray-300 rounded"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Days</label>
          <div className="flex flex-wrap gap-2">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
              (day) => (
                <label key={day} className="flex items-center">
                  <input
                    type="checkbox"
                    value={day}
                    onChange={handleDayChange}
                    className="mr-2"
                  />
                  {day}
                </label>
              )
            )}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Classroom
        </button>
      </form>
    </div>
  );
};

export default ClassroomForm;
