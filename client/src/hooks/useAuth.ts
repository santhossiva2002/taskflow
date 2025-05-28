import { useState, useEffect } from 'react';

export interface User {
  name: string;
  role: 'Admin' | 'User';
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('taskflow_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('taskflow_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (name: string, role: 'Admin' | 'User') => {
    const userData = { name, role };
    setUser(userData);
    localStorage.setItem('taskflow_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('taskflow_user');
    // Force a page refresh to reset the app state
    window.location.reload();
  };

  return {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user
  };
};
