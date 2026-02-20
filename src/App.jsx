import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
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

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
        <Route path="/lessons" element={<ProtectedRoute><Lessons /></ProtectedRoute>} />
        <Route path="/quizes" element={<ProtectedRoute><Quizes /></ProtectedRoute>} />
        <Route path="/user-list" element={<ProtectedRoute><UserList /></ProtectedRoute>} />
        <Route path="/add-course" element={<ProtectedRoute><AddCourse /></ProtectedRoute>} />
        <Route path="/add-lesson" element={<ProtectedRoute><AddLesson /></ProtectedRoute>} />
        <Route path="/add-quiz" element={<ProtectedRoute><AddQuiz /></ProtectedRoute>} />
        <Route path="/add-user" element={<ProtectedRoute><AddUser /></ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  )
}
