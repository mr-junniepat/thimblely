// Common types shared across apps
export interface Item {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface CreateItemInput {
  name: string;
  description: string;
}

export interface UpdateItemInput {
  name?: string;
  description?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

