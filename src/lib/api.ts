import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
console.log('Current API URL:', API_URL);

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle 401 errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            if (window.location.pathname !== '/') {
                window.location.href = '/';
            }
        }
        return Promise.reject(error);
    }
);

export const register = async (userData: any) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};

export const login = async (credentials: any) => {
    const formData = new FormData();
    formData.append('username', credentials.email);
    formData.append('password', credentials.password);
    // Use a fresh axios call to avoid default 'application/json' header
    const response = await axios.post(`${API_URL}/auth/token`, formData);
    return response.data;
};

export const loginWithGoogle = async (token: string) => {
    const response = await api.post('/auth/google', { token });
    return response.data;
};

export const uploadVideo = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/api/videos/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const importLink = async (url: string) => {
    const response = await api.post('/api/videos/link', { source_url: url });
    return response.data;
};

export const analyzeScript = async (data: { script_content: string; platform: string; category: string }) => {
    const response = await api.post('/api/videos/script', data);
    return response.data;
};

export const getAnalysis = async (id: number) => {
    const response = await api.get(`/api/videos/${id}`);
    return response.data;
};

export const downloadReportPdf = async (id: number) => {
    const response = await api.get(`/api/videos/${id}/report.pdf`, {
        responseType: 'blob',
    });
    return response.data;
};

export const getUserVideos = async () => {
    const response = await api.get('/api/videos/');
    return response.data;
};

export const getStats = async () => {
    const response = await api.get('/api/videos/stats/overview');
    return response.data;
};

export const getMe = async () => {
    const response = await api.get('/auth/me');
    return response.data;
};

export const updateUser = async (data: any) => {
    const response = await api.put('/auth/me', data);
    return response.data;
};

export default api;
