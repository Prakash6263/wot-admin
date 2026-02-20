import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? "active" : "";

  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar-inner">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul className="sidebar-vertical list-unstyled">

            <li>
              <Link to="/dashboard" className={isActive("/dashboard")}>
                <i className="fas fa-tachometer-alt me-2"></i>
                <span>Dashboard</span>
              </Link>
            </li>

            <li>
              <Link to="/user-list" className={isActive("/user-list")}>
                <i className="fas fa-users me-2"></i>
                <span>Users</span>
              </Link>
            </li>

            <li>
              <Link to="/courses" className={isActive("/courses")}>
                <i className="fas fa-book me-2"></i>
                <span>Courses</span>
              </Link>
            </li>

            <li>
              <Link to="/lessons" className={isActive("/lessons")}>
                <i className="fas fa-list me-2"></i>
                <span>Lessons</span>
              </Link>
            </li>

            <li>
              <Link to="/quizes" className={isActive("/quizes")}>
                <i className="fas fa-file-alt me-2"></i>
                <span>Quizzes</span>
              </Link>
            </li>

            <li>
              <Link to="/notifications" className={isActive("/notifications")}>
                <i className="fas fa-bell me-2"></i>
                <span>Notifications</span>
              </Link>
            </li>

            <li>
              <Link to="/settings" className={isActive("/settings")}>
                <i className="fas fa-cog me-2"></i>
                <span>Settings</span>
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </div>
  );
}
