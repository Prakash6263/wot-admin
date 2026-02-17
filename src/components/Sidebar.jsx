import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul className="sidebar-vertical">
            <li>
              <Link to="/dashboard" className="active"> <i className="bi bi-speedometer2"></i> <span> Dashboard</span> </Link>
            </li>

            <li>
              <Link to="/user-list"> <i className="bi bi-people"></i> <span> Users</span> </Link>
            </li>

            <li>
              <Link to="/courses"><i className="bi bi-journal-bookmark"></i> <span> Courses</span> </Link>
            </li>
            <li>
              <Link to="/lessons"><i className="bi bi-list"></i> <span> Lessons</span> </Link>
            </li>

            <li>
              <Link to="/quizes"><i className="bi bi-file"></i> <span> Quizes</span> </Link>
            </li>

            <li>
              <Link to="/notifications"><i className="bi bi-bell"></i> <span> Notifications</span> </Link>
            </li>

            <li>
              <Link to="/settings"><i className="fe fe-settings"></i> <span> Settings</span> </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
