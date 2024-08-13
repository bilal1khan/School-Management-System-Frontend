import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ role }) => {
  const links = {
    PRINCIPAL: [
      { to: '/principal', label: 'Dashboard' },
      { to: '/principal/create-classroom', label: 'Create Classroom' },
      { to: '/principal/create-teacher', label: 'Create Teacher Account' },
      { to: '/principal/create-student', label: 'Create Student Account' },
      { to: '/principal/assign-teacher', label: 'Assign Teacher' },
      { to: '/principal/assign-students', label: 'Assign Students To Classroom' },
      { to: '/principal/view-timetable', label: 'view Timetable' },
    ],
    TEACHER: [
      { to: '/teacher', label: 'Dashboard' },
      { to: '/teacher/timetable', label: 'Create Timetable' },
      { to: '/teacher/view-timetable', label: 'view Timetable' },
    ],
    STUDENT: [
      { to: '/student', label: 'Dashboard' },
      { to: '/student/view-timetable', label: 'view Timetable' }
    ],
  };

  if (!role || !links[role]) {
    return <div className="bg-gray-800 text-white w-64 h-full p-6">Invalid role</div>;
  }

  return (
    <div className="bg-gray-800 text-white w-64 h-full p-6">
      <ul>
        {links[role].map((link) => (
          <li key={link.to} className="mb-4">
            <Link to={link.to} className="text-lg hover:underline">{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
