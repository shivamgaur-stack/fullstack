import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API_URL = '/api';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('skillex_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const register = async (name, email, password, role) => {
    const { data } = await axios.post(`${API_URL}/auth/register`, {
      name, email, password, role,
    });
    setUser(data);
    localStorage.setItem('skillex_user', JSON.stringify(data));
    return data;
  };

  const login = async (email, password) => {
    const { data } = await axios.post(`${API_URL}/auth/login`, {
      email, password,
    });
    setUser(data);
    localStorage.setItem('skillex_user', JSON.stringify(data));
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('skillex_user');
  };

  const authAxios = axios.create({
    baseURL: API_URL,
  });

  authAxios.interceptors.request.use((config) => {
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  });

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout, authAxios, API_URL }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
