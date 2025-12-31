import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'

function Header({ showAdminPanel = false, showUserIcon = false }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
    alert('Logged out successfully!')
  }

  return (
    <header className="cyber-header">
      <div className="header-container">
        <div className="header-left">
          {showAdminPanel && <span className="admin-panel-label">Admin Panel</span>}
          <div className="logo" onClick={() => navigate('/')}>
            CyberArena
          </div>
        </div>
        <div className="header-center">
          <Link to="/" className="header-nav-link">Home</Link>
          <Link to="/gaming" className="header-nav-link">Discover</Link>
          <Link to="/gaming" className="header-nav-link">Developers</Link>
          <Link to="/" className="header-nav-link">Community</Link>
        </div>
        <div className="header-right">
          {showAdminPanel && (
            <>
              <span className="header-icon">🔔</span>
              <span className="header-icon">👤</span>
              <button className="logout-btn-header" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
          {showUserIcon && <span className="header-icon">👤</span>}
        </div>
      </div>
      <div className="header-line"></div>
    </header>
  )
}

export default Header

