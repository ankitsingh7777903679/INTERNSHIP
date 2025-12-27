
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dimond from './Dimond'
import AddDimond from './components/AddDimond'
import Header from './components/Header'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Dimond />} />
        <Route path="/dimond" element={<Dimond />} />
        <Route path="/dimond-price" element={<AddDimond />} />
      </Routes>
    </Router>
  )
}

export default App
