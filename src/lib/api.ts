import axios from 'axios';

const rawUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace(/\/$/, '');
const API_URL = rawUrl;
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
            if (!['/', '/login', '/register'].includes(window.location.pathname)) {
                // Save the current location to redirect back after login
                localStorage.setItem('redirect_after_login', window.location.pathname + window.location.search);
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

export const verifyEmail = async (data: { email: string; otp: string }) => {
    const response = await api.post('/auth/verify', data);
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

export const importLink = async (url: string, direct_download_url?: string | null) => {
    const response = await api.post('/api/videos/link', {
        source_url: url,
        direct_download_url: direct_download_url
    });
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

export const getAnalysisBySequence = async (customId: number) => {
    const response = await api.get(`/api/videos/analysis/seq/${customId}`);
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

export const submitOnboarding = async (data: any) => {
    const response = await api.post('/auth/onboarding', data);
    return response.data;
};

// Razorpay types
interface RazorpayOrderResponse {
    id: string;
    entity: string;
    amount: number;
    amount_paid: number;
    amount_due: number;
    currency: string;
    receipt: string;
    status: string;
    attempts: number;
    notes: any;
    created_at: number;
}

export const createRazorpayOrder = async (planId: string, amount: number, currency: string = "INR") => {
    const response = await api.post('/api/razorpay/order', {
        plan_id: planId,
        amount: amount,
        currency: currency
    });
    return response.data as RazorpayOrderResponse;
};

export const verifyRazorpayPayment = async (data: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
    plan: string;
}) => {
    const response = await api.post('/api/razorpay/verify', data);
    return response.data;
};

// Dodo Payments types
interface DodoCheckoutResponse {
    checkout_url: string;
}

export const createDodoCheckoutSession = async (planId: string, amount: number) => {
    // amount in cents
    const response = await api.post('/api/dodopayments/create-checkout-session', {
        plan_id: planId,
        amount: amount
    });
    return response.data as DodoCheckoutResponse;
};

export default api;
