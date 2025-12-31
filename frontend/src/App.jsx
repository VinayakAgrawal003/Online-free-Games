import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import AdminPage from './pages/AdminPage'
import GamingPage from './pages/GamingPage'
import ProfilePage from './pages/ProfilePage'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'

function HomePage() {
  return (
    <div className="cyber-page">
      <Header />
      <div className="home-container">
        <div className="home-content">
          <h1>Welcome to CyberArena</h1>
          <p>Your ultimate gaming destination</p>
          <div className="home-buttons">
            <Link to="/gaming" className="btn btn-primary">Explore Games</Link>
            <Link to="/profile" className="btn btn-secondary">View Profile</Link>
            <Link to="/admin" className="btn btn-secondary">Admin Panel</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/gaming" element={<GamingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

