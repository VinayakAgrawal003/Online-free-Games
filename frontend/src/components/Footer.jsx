import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <footer className="cyber-footer">
      <div className="footer-container">
        <div className="footer-left">
          <span>About | Privacy | Terms | Contact</span>
        </div>
        <div className="footer-center">
          <span>© 2025: CyberArena</span>
        </div>
        <div className="footer-right">
          <span className="social-icon">📘</span>
          <span className="social-icon">🐦</span>
          <span className="social-icon">📷</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer

