import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './GamingPage.css'

function GamingPage() {
  const navigate = useNavigate()
  const [game, setGame] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGameDetails()
  }, [])

  const fetchGameDetails = async () => {
    try {
      setLoading(true)
      // Mock data - in real app, fetch from API
      setTimeout(() => {
        setGame({
          id: 1,
          name: 'Stellar Blade',
          description: 'It is a adventures game, with the infinite levels. Have to complete each level !!!',
          rating: 4.5,
          developer: {
            username: 'xx_player_001',
            name: 'Vinayak Agrawal',
            avatar: '👤'
          },
          coverImage: 'https://via.placeholder.com/300x400/8a2be2/ffffff?text=Stellar+Blade'
        })
        setLoading(false)
      }, 500)
    } catch (error) {
      console.error('Error fetching game:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="cyber-page">
        <Header showUserIcon={true} />
        <div className="loading-state">Loading game...</div>
        <Footer />
      </div>
    )
  }

  if (!game) {
    return (
      <div className="cyber-page">
        <Header showUserIcon={true} />
        <div className="loading-state">Game not found</div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="cyber-page">
      <Header showUserIcon={true} />
      <div className="page-content-wrapper">
        <div className="gaming-page-container">
          <button className="go-back-btn" onClick={() => navigate(-1)}>
            <span>←</span> Go Back
          </button>

          <div className="gaming-content-grid">
            {/* Left Panel - Game Cover & Developer */}
            <div className="game-left-panel">
              <div className="game-cover-card">
                <div className="game-cover-image">
                  <div className="game-cover-placeholder">
                    <span className="game-cover-text">{game.name}</span>
                  </div>
                </div>
                <h2 className="game-title-left">{game.name}</h2>
                <div className="developer-info-left">
                  <span className="developed-by">Developed by:</span>
                  <span className="developer-username">{game.developer.username}</span>
                </div>
              </div>
            </div>

            {/* Right Panel - Game Info, Developer, Reviews */}
            <div className="game-right-panel">
              {/* Game Info Section */}
              <div className="game-info-section">
                <h3 className="section-title-uppercase">GAME INFO</h3>
                <p className="game-description-text">{game.description}</p>
                <div className="game-action-buttons">
                  <button className="rating-btn">
                    ★ Rating ({game.rating})
                  </button>
                  <button className="like-btn">
                    ❤️ Like
                  </button>
                </div>
              </div>

              {/* Developer Section */}
              <div className="developer-section">
                <h3 className="section-title-uppercase">DEVELOPER</h3>
                <div className="developer-card">
                  <div className="developer-avatar-large">
                    {game.developer.avatar}
                  </div>
                  <div className="developer-details">
                    <span className="developer-name">{game.developer.name}</span>
                    <button className="follow-btn">Follow</button>
                  </div>
                </div>
              </div>

              {/* Reviews Section */}
              <div className="reviews-section">
                <h3 className="section-title-uppercase">REVIEWS</h3>
                <div className="reviews-stars">
                  <span className="star-outline">★</span>
                  <span className="star-outline">★</span>
                  <span className="star-outline">★</span>
                  <span className="star-outline">★</span>
                  <span className="star-outline">★</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default GamingPage
