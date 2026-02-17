import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Courses from './pages/Courses'
import Lessons from './pages/Lessons'
import Quizes from './pages/Quizes'
import UserList from './pages/UserList'
import AddCourse from './pages/AddCourse'
import AddLesson from './pages/AddLesson'
import AddQuiz from './pages/AddQuiz'
import AddUser from './pages/AddUser'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/quizes" element={<Quizes />} />
        <Route path="/user-list" element={<UserList />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/add-lesson" element={<AddLesson />} />
        <Route path="/add-quiz" element={<AddQuiz />} />
        <Route path="/add-user" element={<AddUser />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
