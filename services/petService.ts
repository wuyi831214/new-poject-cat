import { supabase, Database } from '../lib/supabase';
import { Pet, ApiResponse, PaginatedResponse, PetFilter } from '../types-extended';

type PetRow = Database['public']['Tables']['pets']['Row'];
type PetInsert = Database['public']['Tables']['pets']['Insert'];
type PetUpdate = Database['public']['Tables']['pets']['Update'];

export class PetService {
  // 获取所有宠物
  static async getAllPets(filters?: PetFilter): Promise<ApiResponse<Pet[]>> {
    try {
      let query = supabase
        .from('pets')
        .select('*')
        .order('created_at', { ascending: false });

      // 应用过滤器
      if (filters) {
        if (filters.status) {
          query = query.eq('status', filters.status);
        }
        if (filters.breed) {
          query = query.ilike('breed', `%${filters.breed}%`);
        }
        if (filters.gender) {
          query = query.eq('gender', filters.gender);
        }
        if (filters.minPrice) {
          query = query.gte('price', filters.minPrice);
        }
        if (filters.maxPrice) {
          query = query.lte('price', filters.maxPrice);
        }
        if (filters.search) {
          query = query.or(`name.ilike.%${filters.search}%,breed.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
        }
        if (filters.tags && filters.tags.length > 0) {
          query = query.contains('tags', filters.tags);
        }
      }

      const { data, error } = await query;

      if (error) throw error;

      return { data: data as Pet[] };
    } catch (error: any) {
      console.error('Error fetching pets:', error);
      return {
        error: {
          message: '获取宠物列表失败',
          code: error.code,
          details: error
        }
      };
    }
  }

  // 根据 ID 获取宠物
  static async getPetById(id: string): Promise<ApiResponse<Pet>> {
    try {
      const { data, error } = await supabase
        .from('pets')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      return { data: data as Pet };
    } catch (error: any) {
      console.error('Error fetching pet:', error);
      return {
        error: {
          message: '获取宠物详情失败',
          code: error.code,
          details: error
        }
      };
    }
  }

  // 创建新宠物
  static async createPet(pet: PetInsert): Promise<ApiResponse<Pet>> {
    try {
      const { data, error } = await supabase
        .from('pets')
        .insert(pet)
        .select()
        .single();

      if (error) throw error;

      return { data: data as Pet };
    } catch (error: any) {
      console.error('Error creating pet:', error);
      return {
        error: {
          message: '创建宠物失败',
          code: error.code,
          details: error
        }
      };
    }
  }

  // 更新宠物信息
  static async updatePet(id: string, updates: PetUpdate): Promise<ApiResponse<Pet>> {
    try {
      const { data, error } = await supabase
        .from('pets')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return { data: data as Pet };
    } catch (error: any) {
      console.error('Error updating pet:', error);
      return {
        error: {
          message: '更新宠物信息失败',
          code: error.code,
          details: error
        }
      };
    }
  }

  // 删除宠物
  static async deletePet(id: string): Promise<ApiResponse<void>> {
    try {
      const { error } = await supabase
        .from('pets')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return {};
    } catch (error: any) {
      console.error('Error deleting pet:', error);
      return {
        error: {
          message: '删除宠物失败',
          code: error.code,
          details: error
        }
      };
    }
  }

  // 获取推荐宠物（基于状态和距离）
  static async getRecommendedPets(limit: number = 6): Promise<ApiResponse<Pet[]>> {
    try {
      const { data, error } = await supabase
        .from('pets')
        .select('*')
        .eq('status', '待领养')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;

      return { data: data as Pet[] };
    } catch (error: any) {
      console.error('Error fetching recommended pets:', error);
      return {
        error: {
          message: '获取推荐宠物失败',
          code: error.code,
          details: error
        }
      };
    }
  }

  // 搜索宠物
  static async searchPets(query: string): Promise<ApiResponse<Pet[]>> {
    try {
      const { data, error } = await supabase
        .from('pets')
        .select('*')
        .or(`name.ilike.%${query}%,breed.ilike.%${query}%,description.ilike.%${query}%`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return { data: data as Pet[] };
    } catch (error: any) {
      console.error('Error searching pets:', error);
      return {
        error: {
          message: '搜索宠物失败',
          code: error.code,
          details: error
        }
      };
    }
  }
}
