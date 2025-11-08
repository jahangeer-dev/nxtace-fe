// Authentication types
export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    accessToken: string;
    user: User;
  };
  message: string;
}

// Template types
export interface Template {
  _id: string;
  name: string;
  description: string;
  thumbnail_url: string;
  category: string;
}

export interface FavoriteTemplate {
  id: string;
  template: Template;
  createdAt: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Form types
export interface FormError {
  field: string;
  message: string;
}
