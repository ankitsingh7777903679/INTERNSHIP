
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dimond from './Dimond'
import AddDimond from './components/AddDimond'
import Header from './components/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DiamondListTable from './components/DiamondListTable'

function App() {
  return (
    <Router>
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<Dimond />} />
        <Route path="/dimond" element={<Dimond />} />
        <Route path="/dimond-price" element={<AddDimond />} />

        {/* 1. Route for Adding New Diamond */}
        <Route path="/add-diamond" element={<AddDimond />} />
        
        {/* 2. Route for Editing (Accepts ID) */}
        <Route path="/add-diamond/:id" element={<AddDimond />} />
        
        {/* 3. Route for Viewing the List */}
        <Route path="/diamond-list" element={<DiamondListTable />} />
      </Routes>
    </Router>
  )
}

export default App
