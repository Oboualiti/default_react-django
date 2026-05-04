import api from './client';

export const authAPI = {
  login: (credentials) => api.post('/auth/login/', credentials),
  logout: (refresh) => api.post('/auth/logout/', { refresh }),
  getMe: () => api.get('/auth/me/'),
  refreshToken: (refresh) => api.post('/auth/token/refresh/', { refresh }),
};
