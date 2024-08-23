import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PokemonList from './components/PokemonList'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<PokemonList />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
