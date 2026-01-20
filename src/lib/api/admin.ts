import axios from 'axios';
// import { getAuthToken } from '@/lib/auth';

// Ensure the API URL has a protocol prefix
const normalizeUrl = (url: string): string => {
    // Remove trailing slash
    url = url.replace(/\/$/, '');
    // Add https:// if no protocol specified
    if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
        return `https://${url}`;
    }
    return url;
};

const API_URL = normalizeUrl(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080');

const adminApi = axios.create({
    baseURL: `${API_URL}/admin`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to add auth token
adminApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor to handle 401 errors
adminApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export interface AdminStats {
    total_users: number;
    active_users: number;
    paid_users: number;
    credits_used_today: number;
}

export interface AdminUser {
    id: number;
    email: string;
    plan: string;
    credits: number;
    is_superuser: boolean;
    created_at: string;
    full_name?: string;
    last_login?: string; // If available
}

export interface UserListResponse {
    data: AdminUser[];
    total: number;
    page: number;
    limit: number;
}

export const getAdminStats = async (): Promise<AdminStats> => {
    const response = await adminApi.get('/stats');
    return response.data;
};

export const getUsers = async (page: number = 1, limit: number = 10, search: string = '', plan: string = ''): Promise<UserListResponse> => {
    const response = await adminApi.get('/users', {
        params: { page, limit, search, plan }
    });
    return response.data;
};

export const updateUser = async (id: number, data: Partial<AdminUser>): Promise<AdminUser> => {
    const response = await adminApi.patch(`/users/${id}`, data);
    return response.data;
};

export const adjustCredits = async (id: number, amount: number): Promise<any> => {
    const response = await adminApi.post(`/users/${id}/credits`, null, {
        params: { amount }
    });
    return response.data;
};

export const deleteUser = async (id: number): Promise<any> => {
    const response = await adminApi.delete(`/users/${id}`);
    return response.data;
};
// Video Types
export interface Video {
    id: number;
    user_id: number;
    source_type: string;
    source_url: string;
    title: string;
    duration: number;
    platform_guess: string;
    created_at: string;
    // Analysis data optional
    viral_score?: number;
    status: string;
}

export interface VideoListResponse {
    data: Video[];
    total: number;
    page: number;
    limit: number;
}

// Review Types
export interface Review {
    id: number;
    name: string;
    role: string;
    content: string;
    rating: number;
    created_at: string;
    is_approved: boolean;
}

export interface ReviewListResponse {
    data: Review[];
    total: number;
    page: number;
    limit: number;
}

// Feedback Types
export interface Feedback {
    id: number;
    user_id: number;
    type: string;
    content: string;
    status: string;
    created_at: string;
    user?: {
        email: string;
    };
}

export interface FeedbackListResponse {
    data: Feedback[];
    total: number;
    page: number;
    limit: number;
}

// API Functions
export const getVideos = async (page: number = 1, limit: number = 10, search: string = ''): Promise<VideoListResponse> => {
    const response = await adminApi.get('/videos', {
        params: { page, limit, search }
    });
    return response.data;
};

export const getReviews = async (page: number = 1, limit: number = 10, approved?: boolean): Promise<ReviewListResponse> => {
    const params: any = { page, limit };
    if (approved !== undefined) params.approved = approved;
    const response = await adminApi.get('/reviews', { params });
    return response.data;
};

export const updateReviewStatus = async (id: number, approve: boolean): Promise<Review> => {
    const response = await adminApi.patch(`/reviews/${id}`, null, {
        params: { approve }
    });
    return response.data;
};

export const deleteReview = async (id: number): Promise<any> => {
    const response = await adminApi.delete(`/reviews/${id}`);
    return response.data;
};

export const getFeedback = async (page: number = 1, limit: number = 10, status?: string, type?: string): Promise<FeedbackListResponse> => {
    const params: any = { page, limit };
    if (status) params.status = status;
    if (type) params.type = type;
    const response = await adminApi.get('/feedback', { params });
    return response.data;
};
