import axios from 'axios';
import type { LoginCredentials, RegisterCredentials, AuthResponse, Template, ApiResponse } from '../types';
import { useAuthStore } from '../store';

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include cookies in requests
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', credentials);
    return response.data;
  },
  
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },
};

// Templates API
export const templatesApi = {
  getAll: async (): Promise<Template[]> => {
    const response = await api.get<ApiResponse<Template[]>>('/templates');
    return response.data.data || [];
  },
  
  getById: async (id: string): Promise<Template> => {
    const response = await api.get<ApiResponse<Template>>(`/templates/${id}`);
    return response.data.data!;
  },
};

// Favorites API
export const favoritesApi = {
  getAll: async (): Promise<Template[]> => {
    const response = await api.get<ApiResponse<Template[]>>('/favorites');
    return response.data.data || [];
  },
  
  add: async (templateId: string): Promise<void> => {
    await api.post(`/favorites/${templateId}`);
  },
  
  remove: async (templateId: string): Promise<void> => {
    await api.delete(`/favorites/${templateId}`);
  },
};

export default api;
