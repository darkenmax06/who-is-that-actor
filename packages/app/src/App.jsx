import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Movie from "./pages/Movie"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<Movie />} />
    </Routes>
  )
}

export default App
