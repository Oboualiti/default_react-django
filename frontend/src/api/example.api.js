// example.api.js
import api from './client';

export const exampleAPI = {
  list: (params) => api.get('/example/', { params }),
  get: (id) => api.get(`/example/${id}/`),
  create: (data) => api.post('/example/', data),
  update: (id, data) => api.patch(`/example/${id}/`, data),
  delete: (id) => api.delete(`/example/${id}/`),
};
