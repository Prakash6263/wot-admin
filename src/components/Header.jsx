import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className="header header-one">
      <Link to="/dashboard" className="d-inline-flex d-sm-inline-flex align-items-center d-md-inline-flex d-lg-none align-items-center device-logo">
        <img src="/assets/img/logo.png" className="img-fluid logo2" alt="Logo" style={{ width: '60px' }} />
      </Link>
      <div className="main-logo d-inline float-start d-lg-flex align-items-center d-none d-sm-none d-md-none">
        <div className="logo-color">
          <Link to="/dashboard">
            <img src="/assets/img/logo.png" className="img-fluid logo-blue" alt="Logo" style={{ width: '200px' }} />
          </Link>
          <Link to="/dashboard">
            <img src="/assets/img/logo-small.png" className="img-fluid logo-small" alt="Logo" style={{ width: '80px' }} />
          </Link>
        </div>
      </div>
      {/* Sidebar Toggle */}
      <a href="javascript:void(0);" id="toggle_btn">
        <span className="toggle-bars">
          <span className="bar-icons"></span>
          <span className="bar-icons"></span>
          <span className="bar-icons"></span>
          <span className="bar-icons"></span>
        </span>
      </a>
      {/* /Sidebar Toggle */}
      
      {/* Search */}
      <div className="top-nav-search">
        <form>
          <input type="text" className="form-control" placeholder="Search dashboard" />
          <button className="btn" type="submit"><img src="/assets/img/icons/search.svg" alt="img" /></button>
        </form>
      </div>
      {/* /Search */}

      {/* Mobile Menu Toggle */}
      <a className="mobile_btn" id="mobile_btn">
        <i className="fas fa-bars"></i>
      </a>
      {/* /Mobile Menu Toggle */}

      {/* Header Menu */}
      <ul className="nav nav-tabs user-menu">
        {/* User Menu */}
        <li className="nav-item dropdown">
          <a href="javascript:void(0)" className="user-link nav-link" data-bs-toggle="dropdown">
            <span className="user-img">
              <img src="/assets/img/profiles/avatar-07.jpg" alt="img" className="profilesidebar" />
              <span className="animate-circle"></span>
            </span>
            <span className="user-content">
              <span className="user-details">Admin</span>
              <span className="user-name">John Smith</span>
            </span>
          </a>
          <div className="dropdown-menu menu-drop-user">
            <div className="profilemenu">
              <div className="subscription-logout">
                <ul>
                  <li className="pb-0">
                    <Link to="/" className="dropdown-item">Log Out</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </li>
        {/* /User Menu */}
      </ul>
      {/* /Header Menu */}
    </div>
  )
}
