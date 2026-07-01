import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session on reload
    const storedUser = localStorage.getItem('sv_user');
    const token = localStorage.getItem('sv_token');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Simple client validation rule
    if (!email || !password) {
      setLoading(false);
      throw new Error('Please fill in all fields.');
    }

    const mockUser = {
      id: 'usr_1',
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      email: email,
      role: 'Founder',
      createdAt: new Date().toLocaleDateString(),
      bio: 'Entrepreneur, innovator, and builder of startups.',
    };

    localStorage.setItem('sv_user', JSON.stringify(mockUser));
    localStorage.setItem('sv_token', 'mock_jwt_token_xyz_123');
    setUser(mockUser);
    setLoading(false);
    return mockUser;
  };

  const register = async (name, email, password) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!name || !email || !password) {
      setLoading(false);
      throw new Error('All fields are required.');
    }

    const mockUser = {
      id: 'usr_random',
      name: name,
      email: email,
      role: 'Founder',
      createdAt: new Date().toLocaleDateString(),
      bio: 'New explorer in the startup ecosystem.',
    };

    localStorage.setItem('sv_user', JSON.stringify(mockUser));
    localStorage.setItem('sv_token', 'mock_jwt_token_xyz_123');
    setUser(mockUser);
    setLoading(false);
    return mockUser;
  };

  const logout = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    localStorage.removeItem('sv_user');
    localStorage.removeItem('sv_token');
    setUser(null);
    setLoading(false);
  };

  const updateProfile = async (updates) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const updatedUser = {
      ...user,
      ...updates
    };

    localStorage.setItem('sv_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setLoading(false);
    return updatedUser;
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
