// API DTOs for Skul Africa

export interface School {
  id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  isActive: boolean;
  subdomain: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginRequest {
  email: string;
  profileCode: string;
}

export interface AuthResponse {
  token: string;
  school?: School;
  student?: Student;
  teacher?: Teacher;
}

export interface Student {
  id?: string;
  firstname: string;
  lastname: string;
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  phone: string;
  classId: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  address: string;
  city: string;
  state: string;
  admissionNumber?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface StudentLoginRequest {
  admissionNumber: string;
  password: string;
  subdomain: string;
}

export interface Teacher {
  id?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  subjectIds?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Subject {
  id?: string;
  name: string;
  code: string;
  type: 'core' | 'elective';
  classId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Classroom {
  id?: string;
  name?: string;
  level?: string;
  capacity?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface AcademicYear {
  id: string;
  name: string;
  isActive: boolean;
  terms: AcademicTerm[];
}

export interface AcademicTerm {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface GalleryItem {
  id?: string;
  title: string;
  imageUrl: string;
  createdAt?: string;
}

// API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Public School Data
export interface PublicSchoolData {
  branding: {
    schoolName: string;
    motto: string;
    logo: string;
    favicon: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    fontStyle: string;
  };
  homepage: {
    hero: {
      title: string;
      subtitle: string;
      bgImage: string;
      ctaText: string;
      ctaLink: string;
    };
    about: {
      description: string;
      vision: string;
      mission: string;
      image: string;
    };
    academics: Array<{
      id: string;
      title: string;
      description: string;
      image: string;
    }>;
    gallery: string[];
    testimonials: Array<{
      id: string;
      name: string;
      role: string;
      content: string;
      image: string;
    }>;
  };
  visibility: {
    hero: boolean;
    about: boolean;
    academics: boolean;
    gallery: boolean;
    testimonials: boolean;
    contact: boolean;
  };
  theme: {
    mode: 'classic' | 'minimal' | 'modern' | 'dark' | 'gradient';
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    socials: {
      facebook: string;
      instagram: string;
      twitter: string;
      whatsapp: string;
    };
  };
  navigation: {
    links: Array<{ id: string; label: string; href: string }>;
  };
  footer: {
    text: string;
    copyright: string;
  };
}

// Error response
export interface ApiError {
  message: string;
  status: number;
}