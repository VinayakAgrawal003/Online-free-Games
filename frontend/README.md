# Game Arena Frontend

A modern React frontend application for the Game Arena platform with Admin, Gaming, and Profile pages.

## Features

- 🎮 **Gaming Page**: Browse and filter games by genre
- 👤 **Profile Page**: View and edit user profile information
- 🔐 **Admin Page**: Manage game approvals and platform statistics

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Access the Application**
   - Open your browser and navigate to `http://localhost:3000`
   - The app will automatically proxy API requests to `http://localhost:5001`

## Project Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── AdminPage.jsx      # Admin dashboard
│   │   ├── GamingPage.jsx     # Game browsing page
│   │   ├── ProfilePage.jsx    # User profile page
│   │   └── PageStyles.css     # Shared page styles
│   ├── App.jsx                # Main app component with routing
│   ├── App.css                # Global app styles
│   ├── main.jsx               # Entry point
│   └── index.css              # Base styles
├── index.html                 # HTML template
├── package.json               # Dependencies
└── vite.config.js            # Vite configuration
```

## Pages

### Admin Page (`/admin`)
- View platform statistics (users, games, approvals)
- Approve or reject pending games
- Access admin actions and settings

### Gaming Page (`/gaming`)
- Browse all available games
- Filter games by genre
- View game details and ratings
- Featured games section

### Profile Page (`/profile`)
- View user profile information
- Edit profile details
- View recent activity
- See account statistics

## API Integration

The frontend is set up to integrate with your backend API. Currently, the pages use mock data. To connect to your backend:

1. Uncomment the API calls in each page component
2. Ensure your backend server is running on `http://localhost:5001`
3. Make sure CORS is configured on your backend to allow requests from `http://localhost:3000`

## Technologies Used

- **React 18**: UI library
- **React Router DOM**: Client-side routing
- **Vite**: Build tool and dev server
- **Axios**: HTTP client (for API calls)

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

