import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './AdminPage.css'

function AdminPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('home')
  const [pendingGames, setPendingGames] = useState([])
  const [stats, setStats] = useState({
    totalGames: 2540,
    totalDevelopers: 1875,
    activeGames: 2200,
    earnings: 25450,
    gamesAccepted: 350,
    gamesRejected: 24
  })
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 3

  useEffect(() => {
    fetchPendingGames()
  }, [])

  const fetchPendingGames = async () => {
    try {
      // Mock data
      setPendingGames([
        {
          id: 1,
          name: 'Shadow Realms',
          developer: 'PixelForge Studios',
          uploaded: '1 March 2023, 7:30 am',
          status: 'pending',
          thumbnail: '🌌'
        },
        {
          id: 2,
          name: 'Retro Racing 3d',
          developer: 'IndiePixel Studios',
          uploaded: '4 March 2023, 7:50 pm',
          status: 'pending',
          thumbnail: '🏎️'
        },
        {
          id: 3,
          name: 'Mystic Quest',
          developer: 'Luna Games',
          uploaded: '4 March 2023, 7:50 pm',
          status: 'pending',
          thumbnail: '⚔️'
        },
        {
          id: 4,
          name: 'Pixel Adventure',
          developer: 'RetroSoft Games',
          uploaded: '1 March 2023, 7:30 am',
          status: 'pending',
          thumbnail: '🎮'
        }
      ])
    } catch (error) {
      console.error('Error fetching pending games:', error)
    }
  }

  const handleApprove = async (gameId) => {
    try {
      setPendingGames(pendingGames.filter(game => game.id !== gameId))
      setStats(prev => ({
        ...prev,
        gamesAccepted: prev.gamesAccepted + 1,
        totalGames: prev.totalGames + 1,
        activeGames: prev.activeGames + 1
      }))
      alert('Game approved successfully!')
    } catch (error) {
      console.error('Error approving game:', error)
    }
  }

  const handleDeny = async (gameId) => {
    try {
      setPendingGames(pendingGames.filter(game => game.id !== gameId))
      setStats(prev => ({
        ...prev,
        gamesRejected: prev.gamesRejected + 1
      }))
      alert('Game denied')
    } catch (error) {
      console.error('Error denying game:', error)
    }
  }

  const handleLogout = () => {
    navigate('/')
    alert('Logged out successfully!')
  }

  return (
    <div className="cyber-page">
      <Header showAdminPanel={true} />
      <div className="admin-page-wrapper">
        <div className="admin-layout">
          {/* Left Sidebar */}
          <div className="admin-sidebar">
            <div className="sidebar-menu-admin">
              <button
                className={`sidebar-item-admin ${activeTab === 'home' ? 'active' : ''}`}
                onClick={() => setActiveTab('home')}
              >
                Home
              </button>
              <button
                className={`sidebar-item-admin ${activeTab === 'manage-games' ? 'active' : ''}`}
                onClick={() => setActiveTab('manage-games')}
              >
                Manage Games
              </button>
              <button
                className={`sidebar-item-admin ${activeTab === 'manage-developers' ? 'active' : ''}`}
                onClick={() => setActiveTab('manage-developers')}
              >
                Manage Developers
              </button>
              <button
                className={`sidebar-item-admin ${activeTab === 'reports' ? 'active' : ''}`}
                onClick={() => setActiveTab('reports')}
              >
                Reports
              </button>
              <button
                className={`sidebar-item-admin ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                Settings
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="admin-main-content">
            {/* Dashboard Statistics */}
            <div className="dashboard-stats">
              <div className="stats-row-large">
                <div className="stat-card-large">
                  <div className="stat-icon">🎮</div>
                  <div className="stat-info">
                    <div className="stat-number">{stats.totalGames}</div>
                    <div className="stat-text">Total Games</div>
                  </div>
                </div>
                <div className="stat-card-large">
                  <div className="stat-icon">👥</div>
                  <div className="stat-info">
                    <div className="stat-number">{stats.totalDevelopers}</div>
                    <div className="stat-text">Total Developers</div>
                  </div>
                </div>
                <div className="stat-card-large">
                  <div className="stat-icon">📊</div>
                  <div className="stat-info">
                    <div className="stat-number">{stats.activeGames}</div>
                    <div className="stat-text">Active Games</div>
                  </div>
                </div>
              </div>
              <div className="stats-row-small">
                <div className="stat-card-small">
                  <div className="stat-icon-small">💰</div>
                  <div className="stat-number-small">{stats.earnings.toLocaleString()}</div>
                </div>
                <div className="stat-card-small">
                  <div className="stat-icon-small">✅</div>
                  <div className="stat-number-small">{stats.gamesAccepted}</div>
                </div>
                <div className="stat-card-small">
                  <div className="stat-icon-small">❌</div>
                  <div className="stat-number-small">{stats.gamesRejected}</div>
                </div>
              </div>
            </div>

            {/* Manage Pending Games */}
            <div className="pending-games-section">
              <h2 className="section-heading-admin">Manage Pending Games</h2>
              <div className="search-bar">
                <span className="search-icon">🔍</span>
                <input type="text" placeholder="Search" className="search-input" />
              </div>

              <div className="games-table">
                <div className="table-header">
                  <div className="table-col">Game</div>
                  <div className="table-col">Uploaded</div>
                  <div className="table-col">Status</div>
                </div>
                {pendingGames.map(game => (
                  <div key={game.id} className="table-row">
                    <div className="table-col">
                      <div className="game-cell">
                        <span className="game-thumbnail">{game.thumbnail}</span>
                        <div className="game-details-cell">
                          <div className="game-name-cell">{game.name}</div>
                          <div className="game-developer-cell">{game.developer}</div>
                        </div>
                      </div>
                    </div>
                    <div className="table-col">{game.uploaded}</div>
                    <div className="table-col">
                      <button
                        className="approve-btn"
                        onClick={() => handleApprove(game.id)}
                      >
                        ✓ Approve
                      </button>
                      <button
                        className="deny-btn"
                        onClick={() => handleDeny(game.id)}
                      >
                        ✗ Deny
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="pagination">
                <button
                  className="page-btn"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="page-info">
                  &lt;&lt; {currentPage}/{totalPages} &gt;&gt;
                </span>
                <button
                  className="page-btn"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AdminPage
