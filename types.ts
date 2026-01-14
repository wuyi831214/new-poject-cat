
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
  status: '审核中' | '已通过' | '已完成';
  progress: number;
}
