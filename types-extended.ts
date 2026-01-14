export type Page = 'home' | 'details' | 'form' | 'profile' | 'ai-chat' | 'discovery' | 'messages';

export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: string;
  gender: '公' | '母';
  weight: string;
  distance: string;
  location: string;
  image: string;
  tags: string[];
  description: string;
  status: '待领养' | '审核中' | '已通过';
  price: number;
}

export interface Application {
  id: string;
  pet: Pet;
  status: '审核中' | '已通过' | '已完成' | '已拒绝';
  progress: number;
  user_name: string;
  user_email: string;
  user_phone: string;
  house_type: string;
  ownership_type: string;
  experience: string;
  reason: string;
  created_at: string;
  updated_at: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  pet_id: string;
  pet: Pet;
  created_at: string;
}

export interface Message {
  id: string;
  user_id: string;
  content: string;
  role: 'user' | 'assistant';
  created_at: string;
}

export interface AdoptionFormData {
  petId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  houseType: string;
  ownershipType: string;
  experience: string;
  reason: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface PetFilter {
  breed?: string;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
  gender?: '公' | '母';
  tags?: string[];
  search?: string;
}
