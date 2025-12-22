import { Navigate, Route, Routes } from 'react-router-dom'
import Student from './Student'
import ManageAcademic from './pages/ManageAcademic'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/students" replace />} />
        <Route path="/students" element={<Student />} />
        <Route path="/academic" element={<ManageAcademic />} />
        <Route path="*" element={<Navigate to="/students" replace />} />
      </Routes>
    </>
  )
}
