import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateTimetable = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [periods, setPeriods] = useState([]);
  const [subject, setSubject] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');

  useEffect(() => {
    // Fetch classrooms and teachers
    const fetchClassrooms = async () => {
      try {
        const res = await axios.get('https://school-management-system-backend-7vn2.onrender.com/api/teacher/classrooms');
        setClassrooms(res.data);
      } catch (error) {
        toast.error('Error fetching classrooms');
        console.error('Error fetching classrooms', error);
      }
    };

    const fetchTeachers = async () => {
      try {
        const res = await axios.get('https://school-management-system-backend-7vn2.onrender.com/api/teacher/teachers');
        setTeachers(res.data);
      } catch (error) {
        toast.error('Error fetching teachers');
        console.error('Error fetching teachers', error);
      }
    };

    fetchClassrooms();
    fetchTeachers();
  }, []);

  const addPeriod = () => {
    setPeriods([
      ...periods,
      { subject, startTime, endTime, teacherId: selectedTeacher },
    ]);
    setSubject('');
    setStartTime('');
    setEndTime('');
    setSelectedTeacher('');
  };

  const handleSubmit = async () => {
    try {
      await axios.post('https://school-management-system-backend-7vn2.onrender.com/api/teacher/create-timetable', {
        classroomId: selectedClassroom,
        day: selectedDay,
        periods,
      });
      toast.success('Timetable created successfully');
    } catch (error) {
      toast.error('Error creating timetable');
      console.error('Error creating timetable', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-4">Create Timetable</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700">Select Classroom:</label>
        <select
          value={selectedClassroom}
          onChange={(e) => setSelectedClassroom(e.target.value)}
          className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Classroom</option>
          {classrooms.map(classroom => (
            <option key={classroom.id} value={classroom.id}>
              {classroom.name} ({classroom.startTime} - {classroom.endTime})
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Select Day:</label>
        <select
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Day</option>
          {classrooms.find(c => c.id === parseInt(selectedClassroom))?.days.map((day, index) => (
            <option key={index} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Subject:</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700">Start Time:</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700">End Time:</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Select Teacher:</label>
        <select
          value={selectedTeacher}
          onChange={(e) => setSelectedTeacher(e.target.value)}
          className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Teacher</option>
          {teachers.map(teacher => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={addPeriod}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Add Period
      </button>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Periods:</h3>
        <ul>
          {periods.map((period, index) => (
            <li key={index} className="mb-2">
              {period.subject} - {period.startTime} to {period.endTime} (Teacher: {teachers.find(t => t.id === period.teacherId)?.name})
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
      >
        Create Timetable
      </button>
    </div>
  );
};

export default CreateTimetable;
