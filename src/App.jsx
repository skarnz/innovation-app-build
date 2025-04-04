import React, { useState, useEffect } from 'react';
import DashboardLayout from './components/DashboardLayout';
import AiAgent from './components/AiAgent';
import { getAuthStatus, loginWithGithub, logout } from './services/api';
// import reactLogo from './assets/react.svg' // Remove default logo imports
// import viteLogo from '/vite.svg'
// import './App.css' // Keep or modify default styles as needed

function App() {
  // Remove default Vite state
  // const [count, setCount] = useState(0)

  // Add state for auth status
  const [authStatus, setAuthStatus] = useState({ authenticated: false, user: null });
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Check auth status on initial load
  useEffect(() => {
    const checkStatus = async () => {
      try {
        setLoadingAuth(true);
        const status = await getAuthStatus();
        setAuthStatus(status);
      } catch (error) {       
        console.error("Error checking auth status:", error);
        setAuthStatus({ authenticated: false, user: null }); // Assume logged out on error
      } finally {
        setLoadingAuth(false);
      }
    };
    checkStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      // Re-check status after logout attempt
      const status = await getAuthStatus();
      setAuthStatus(status);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <DashboardLayout>
      {/* Main content based on routing/state later */}
      <h2>Main Application Content Area</h2>
      
      {loadingAuth ? (
        <p>Loading authentication status...</p>
      ) : authStatus.authenticated ? (
        <div>
          <p>Welcome, {authStatus.user?.username || 'User'}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
          <button onClick={loginWithGithub}>Login with GitHub</button>
          {/* Add Google login button later */}
        </div>
      )}

      <p>Other content can go here...</p>

      {/* Render AI Agent persistently */}
      <AiAgent />
    </DashboardLayout>
  );
}

export default App;
