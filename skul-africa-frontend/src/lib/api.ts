import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';
import {
  School,
  AuthResponse,
  LoginRequest,
  Student,
  StudentLoginRequest,
  Teacher,
  Subject,
  Classroom,
  AcademicYear,
  GalleryItem,
  PublicSchoolData,
  ApiResponse,
} from '@/types/api';

const BASE_URL = 'https://skul-africa.onrender.com';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('schoolData');
      // Redirect to login if needed
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    const message = error.response?.data?.message || 'An error occurred';
    toast.error(message);
    return Promise.reject(error);
  }
);

// Helper function to handle API responses
const handleResponse = <T>(response: AxiosResponse<ApiResponse<T>>): T => {
  if (response.data.success) {
    return response.data.data;
  }
  throw new Error(response.data.message || 'API request failed');
};

// School Auth & Management
export const createSchool = async (data: Omit<School, 'id'>): Promise<School> => {
  const response = await api.post('/api/v1/schools', data);
  toast.success('School created successfully');
  return handleResponse(response);
};

export const loginSchool = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await api.post('/api/v1/schools/login', data);
  const authData = handleResponse<AuthResponse>(response);
  localStorage.setItem('authToken', authData.token);
  localStorage.setItem('schoolData', JSON.stringify(authData.school));
  toast.success('Login successful');
  return authData;
};

export const getCurrentSchool = async (): Promise<School> => {
  const response = await api.get('/api/v1/schools/me');
  return handleResponse(response);
};

export const updateSchool = async (data: Partial<School>): Promise<School> => {
  const response = await api.patch('/api/v1/schools/me', data);
  toast.success('School updated successfully');
  return handleResponse(response);
};

export const deleteSchool = async (): Promise<void> => {
  await api.delete('/api/v1/schools/me');
  toast.success('School deleted successfully');
};

// Academic Year & Term Management
export const endCurrentAcademicYear = async (): Promise<void> => {
  await api.post('/api/v1/academic-year/end-current');
  toast.success('Academic year ended successfully');
};

export const startNewAcademicYear = async (): Promise<void> => {
  await api.post('/api/v1/academic-year/start-new');
  toast.success('New academic year started successfully');
};

export const endCurrentAcademicTerm = async (): Promise<void> => {
  await api.post('/api/v1/academic-term/end-current');
  toast.success('Academic term ended successfully');
};

export const getActiveAcademicYear = async (): Promise<AcademicYear> => {
  const response = await api.get('/api/v1/schools/me');
  const school = handleResponse<School & { activeAcademicYear: AcademicYear }>(response);
  return school.activeAcademicYear;
};

// Classroom Management
export const createClassroom = async (data: Omit<Classroom, 'id'>): Promise<Classroom> => {
  const response = await api.post('/api/v1/classrooms', data);
  toast.success('Classroom created successfully');
  return handleResponse(response);
};

export const getAllClassrooms = async (): Promise<Classroom[]> => {
  const response = await api.get('/api/v1/classrooms');
  return handleResponse(response);
};

export const getClassroomById = async (id: string): Promise<Classroom> => {
  const response = await api.get(`/api/v1/classrooms/${id}`);
  return handleResponse(response);
};

export const updateClassroom = async (id: string, data: Partial<Classroom>): Promise<Classroom> => {
  const response = await api.patch(`/api/v1/classrooms/${id}`, data);
  toast.success('Classroom updated successfully');
  return handleResponse(response);
};

export const deleteClassroom = async (id: string): Promise<void> => {
  await api.delete(`/api/v1/classrooms/${id}`);
  toast.success('Classroom deleted successfully');
};

// Student Management
export const createStudent = async (data: Omit<Student, 'id'>): Promise<Student> => {
  const response = await api.post('/api/v1/students', data);
  toast.success('Student created successfully');
  return handleResponse(response);
};

export const getAllStudents = async (): Promise<Student[]> => {
  const response = await api.get('/api/v1/students');
  return handleResponse(response);
};

export const getStudentById = async (id: string): Promise<Student> => {
  const response = await api.get(`/api/v1/students/${id}`);
  return handleResponse(response);
};

export const updateStudent = async (id: string, data: Partial<Student>): Promise<Student> => {
  const response = await api.patch(`/api/v1/students/${id}`, data);
  toast.success('Student updated successfully');
  return handleResponse(response);
};

export const deleteStudent = async (id: string): Promise<void> => {
  await api.delete(`/api/v1/students/${id}`);
  toast.success('Student deleted successfully');
};

export const searchStudents = async (query: string): Promise<Student[]> => {
  const response = await api.get(`/api/v1/students/search?q=${encodeURIComponent(query)}`);
  return handleResponse(response);
};

export const loginStudent = async (data: StudentLoginRequest): Promise<AuthResponse> => {
  const response = await api.post('/api/v1/students/auth/login', data);
  const authData = handleResponse<AuthResponse>(response);
  localStorage.setItem('authToken', authData.token);
  // Assuming student data is in authData
  toast.success('Student login successful');
  return authData;
};

// Teacher Management
export const createTeacher = async (data: Omit<Teacher, 'id'>): Promise<Teacher> => {
  const response = await api.post('/api/v1/teachers', data);
  toast.success('Teacher created successfully');
  return handleResponse(response);
};

export const getAllTeachers = async (): Promise<Teacher[]> => {
  const response = await api.get('/api/v1/teachers');
  return handleResponse(response);
};

export const getTeacherById = async (id: string): Promise<Teacher> => {
  const response = await api.get(`/api/v1/teachers/${id}`);
  return handleResponse(response);
};

export const updateTeacher = async (id: string, data: Partial<Teacher>): Promise<Teacher> => {
  const response = await api.patch(`/api/v1/teachers/${id}`, data);
  toast.success('Teacher updated successfully');
  return handleResponse(response);
};

export const deleteTeacher = async (id: string): Promise<void> => {
  await api.delete(`/api/v1/teachers/${id}`);
  toast.success('Teacher deleted successfully');
};

// Subject Management
export const createSubject = async (data: Omit<Subject, 'id'>): Promise<Subject> => {
  const response = await api.post('/api/v1/subjects', data);
  toast.success('Subject created successfully');
  return handleResponse(response);
};

export const getAllSubjects = async (): Promise<Subject[]> => {
  const response = await api.get('/api/v1/subjects');
  return handleResponse(response);
};

export const getSubjectById = async (id: string): Promise<Subject> => {
  const response = await api.get(`/api/v1/subjects/${id}`);
  return handleResponse(response);
};

export const updateSubject = async (id: string, data: Partial<Subject>): Promise<Subject> => {
  const response = await api.patch(`/api/v1/subjects/${id}`, data);
  toast.success('Subject updated successfully');
  return handleResponse(response);
};

export const deleteSubject = async (id: string): Promise<void> => {
  await api.delete(`/api/v1/subjects/${id}`);
  toast.success('Subject deleted successfully');
};

// Gallery Management
export const uploadGalleryImage = async (file: File, title: string): Promise<GalleryItem> => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('title', title);

  const response = await api.post('/api/v1/gallery', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  toast.success('Image uploaded successfully');
  return handleResponse(response);
};

export const getGallery = async (): Promise<GalleryItem[]> => {
  const response = await api.get('/api/v1/gallery');
  return handleResponse(response);
};

export const deleteGalleryImage = async (id: string): Promise<void> => {
  await api.delete(`/api/v1/gallery/${id}`);
  toast.success('Image deleted successfully');
};

// Logout function
export const logout = (): void => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('schoolData');
  toast.success('Logged out successfully');
};

// Public School Data
export const getSchoolPublicData = async (subdomain: string): Promise<PublicSchoolData> => {
  const response = await api.get(`/api/v1/schools/${subdomain}/public`);
  return handleResponse(response);
};

export const updateSchoolPublicContent = async (id: string, data: Partial<PublicSchoolData>): Promise<PublicSchoolData> => {
  const response = await api.put(`/api/v1/schools/${id}/public-content`, data);
  toast.success('Public content updated successfully');
  return handleResponse(response);
};
