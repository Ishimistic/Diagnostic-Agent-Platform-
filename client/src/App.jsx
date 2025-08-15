import React, { useState, useEffect } from 'react';
import Login from './components/auth/Login';
import Dashboard from './pages/Dashboard';
import { isLoggedIn, removeToken } from './utils/auth';


const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isLoggedIn()) {
      setUser({ email: 'admin@intucate.com' });
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    removeToken();
    setUser(null);
  };

  return (
    <div className="App">
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;