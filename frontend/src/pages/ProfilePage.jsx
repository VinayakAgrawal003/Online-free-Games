import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './ProfilePage.css'

function ProfilePage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    age: '',
    currentPassword: ''
  })
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  })

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    try {
      // Mock data
      setFormData({
        username: 'johndoe',
        email: 'john.doe@example.com',
        age: '25',
        currentPassword: ''
      })
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSaveChanges = async (e) => {
    e.preventDefault()
    try {
      alert('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile')
    }
  }

  const handleLogout = () => {
    navigate('/')
    alert('Logged out successfully!')
  }

  return (
    <div className="cyber-page">
      <Header showUserIcon={true} />
      <div className="page-content-wrapper">
        <div className="profile-page-container">
          <div className="profile-sidebar">
            <button className="go-back-btn" onClick={() => navigate(-1)}>
              <span>←</span> Go Back
            </button>
            <div className="sidebar-menu">
              <button
                className={`sidebar-menu-item ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                Profile
              </button>
              <button
                className={`sidebar-menu-item ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                Settings
              </button>
              <button
                className={`sidebar-menu-item ${activeTab === 'connected-accounts' ? 'active' : ''}`}
                onClick={() => setActiveTab('connected-accounts')}
              >
                Connected Accounts
              </button>
              <button
                className={`sidebar-menu-item ${activeTab === 'billing' ? 'active' : ''}`}
                onClick={() => setActiveTab('billing')}
              >
                Billings
              </button>
              <button
                className="sidebar-menu-item logout-item"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>

          <div className="profile-main-content">
            <h1 className="profile-page-title">User Profile</h1>
            
            <div className="account-info-section">
              <h2 className="section-heading">Account Info</h2>
              <div className="account-info-content">
                <div className="user-icon-large">
                  <div className="user-icon-circle"></div>
                </div>
                <div className="account-form-fields">
                  <div className="form-field-row">
                    <label className="field-label">Username</label>
                    <div className="input-with-button">
                      <input
                        type="text"
                        name="username"
                        className="cyber-input"
                        value={formData.username}
                        onChange={handleInputChange}
                      />
                      <button className="change-btn">Change</button>
                    </div>
                  </div>

                  <div className="form-field-row">
                    <label className="field-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="cyber-input"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-field-row">
                    <label className="field-label">Age</label>
                    <input
                      type="number"
                      name="age"
                      className="cyber-input"
                      value={formData.age}
                      onChange={handleInputChange}
                      min="12"
                      max="60"
                    />
                  </div>

                  <div className="form-field-row">
                    <label className="field-label">Current Password</label>
                    <input
                      type="password"
                      name="currentPassword"
                      className="cyber-input"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      placeholder="Enter current password"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="change-password-section">
              <h2 className="section-heading">Change Password</h2>
              <div className="password-form-fields">
                <div className="form-field-row">
                  <label className="field-label">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    className="cyber-input"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter new password"
                  />
                </div>

                <div className="form-field-row">
                  <label className="field-label">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="cyber-input"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
              <button className="save-changes-btn" onClick={handleSaveChanges}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ProfilePage
