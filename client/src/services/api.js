// import { API_BASE } from '../utils/constants';
import { getToken } from '../utils/auth';

const API_BASE = 'http://localhost:4000/api';

const api = {

  async request(endpoint, options = {}) {
    const token = getToken();

    const isFormData = options.body instanceof FormData;
    const config = {
      headers: {
        ...(!isFormData && { 'Content-Type': 'application/json' }),
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(`${API_BASE}${endpoint}`, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }
    
    return data;
  },

  login: (email, password) => api.request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  }),

  savePrompt: (text, version) => api.request('/admin/prompt', {
    method: 'POST',
    body: JSON.stringify({ text, version }),
  }),

  getLatestPrompt: () => api.request('/admin/prompt'),
  
  generateDiagnostic: (text) => api.request('/admin/generate', { 
    method: 'POST',
    body: JSON.stringify({ text }),
  }),


  uploadJSON: (student_id, attempts) => api.request('/data/upload/json', {
    method: 'POST',
    body: JSON.stringify({ student_id, attempts }),
  }),

  uploadCSV: (formData) => api.request('/data/upload/csv', {
    method: 'POST',
    body: formData,
  }),

  getAttempts: (student_id) => api.request(`/data/${student_id}`),

  // SQI
  computeSQI: (student_id) => api.request(`/sqi/${student_id}/compute`),
  getSummaryPayload: (student_id) => api.request(`/sqi/${student_id}/payload`),
};

export default api;
