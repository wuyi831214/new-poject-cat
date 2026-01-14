import { supabase, Database } from '../lib/supabase';
import { Favorite, ApiResponse } from '../types-extended';
import { PetService } from './petService';

type FavoriteRow = Database['public']['Tables']['favorites']['Row'];
type FavoriteInsert = Database['public']['Tables']['favorites']['Insert'];

export class FavoriteService {
  // 获取用户收藏列表
  static async getUserFavorites(userId: string): Promise<ApiResponse<Favorite[]>> {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // 获取关联的宠物信息
      const favorites = await Promise.all(
        (data as FavoriteRow[]).map(async (fav) => {
          const petResponse = await PetService.getPetById(fav.pet_id);
          const pet = petResponse.data;
          
          return {
            ...fav,
            pet: pet!
          } as Favorite;
        })
      );

      return { data: favorites };
    } catch (error: any) {
      console.error('Error fetching favorites:', error);
      return {
        error: {
          message: '获取收藏列表失败',
          code: error.code,
          details: error
        }
      };
    }
  }

  // 添加收藏
  static async addFavorite(userId: string, petId: string): Promise<ApiResponse<Favorite>> {
    try {
      const favorite: FavoriteInsert = {
        user_id: userId,
        pet_id: petId
      };

      const { data, error } = await supabase
        .from('favorites')
        .insert(favorite)
        .select()
        .single();

      if (error) throw error;

      const petResponse = await PetService.getPetById((data as FavoriteRow).pet_id);
      const pet = petResponse.data;

      return {
        data: {
          ...(data as FavoriteRow),
          pet: pet!
        }
      };
    } catch (error: any) {
      console.error('Error adding favorite:', error);
      return {
        error: {
          message: '添加收藏失败',
          code: error.code,
          details: error
        }
      };
    }
  }

  // 移除收藏
  static async removeFavorite(userId: string, petId: string): Promise<ApiResponse<void>> {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('pet_id', petId);

      if (error) throw error;

      return {};
    } catch (error: any) {
      console.error('Error removing favorite:', error);
      return {
        error: {
          message: '移除收藏失败',
          code: error.code,
          details: error
        }
      };
    }
  }

  // 检查是否已收藏
  static async isFavorite(userId: string, petId: string): Promise<ApiResponse<boolean>> {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', userId)
        .eq('pet_id', petId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      return { data: !!data };
    } catch (error: any) {
      console.error('Error checking favorite:', error);
      return {
        error: {
          message: '检查收藏状态失败',
          code: error.code,
          details: error
        }
      };
    }
  }

  // 切换收藏状态
  static async toggleFavorite(userId: string, petId: string): Promise<ApiResponse<Favorite | null>> {
    try {
      const isFavResponse = await this.isFavorite(userId, petId);
      
      if (isFavResponse.data) {
        await this.removeFavorite(userId, petId);
        return { data: null };
      } else {
        return await this.addFavorite(userId, petId);
      }
    } catch (error: any) {
      console.error('Error toggling favorite:', error);
      return {
        error: {
          message: '切换收藏状态失败',
          code: error.code,
          details: error
        }
      };
    }
  }
}
