import axios from 'axios';
import { TestResponse } from '../../types/test';


export const api = axios.create({
  baseURL: import.meta.env.VITE_SUPABASE_URL,
  headers: {
      'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Key change: Return response.data directly
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
      console.error('API Error:', error.response?.data || error.message);
      return Promise.reject(error);
  }
);


export const testApi = {
  getTestData: () => api.get<TestResponse, TestResponse>('/test/supabase'),
}; 