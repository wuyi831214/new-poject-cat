import { supabase, Database } from '../lib/supabase';
import { Application, AdoptionFormData, ApiResponse } from '../types-extended';
import { PetService } from './petService';

type ApplicationRow = Database['public']['Tables']['applications']['Row'];
type ApplicationInsert = Database['public']['Tables']['applications']['Insert'];

export class ApplicationService {
  // 获取所有申请
  static async getAllApplications(filters?: {
    userId?: string;
    status?: string;
  }): Promise<ApiResponse<Application[]>> {
    try {
      let query = supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (filters?.userId) {
        query = query.eq('user_email', filters.userId);
      }

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      const { data, error } = await query;

      if (error) throw error;

      // 获取关联的宠物信息
      const applications = await Promise.all(
        (data as ApplicationRow[]).map(async (app) => {
          const petResponse = await PetService.getPetById(app.pet_id);
          const pet = petResponse.data;
          
          return {
            ...app,
            pet: pet!,
            progress: this.calculateProgress(app.status)
          } as Application;
        })
      );

      return { data: applications };
    } catch (error: any) {
      console.error('Error fetching applications:', error);
      return {
        error: {
          message: '获取申请列表失败',
          code: error.code,
          details: error
        }
      };
    }
  }

  // 根据 ID 获取申请
  static async getApplicationById(id: string): Promise<ApiResponse<Application>> {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      const petResponse = await PetService.getPetById((data as ApplicationRow).pet_id);
      const pet = petResponse.data;

      return {
        data: {
          ...(data as ApplicationRow),
          pet: pet!,
          progress: this.calculateProgress((data as ApplicationRow).status)
        }
      };
    } catch (error: any) {
      console.error('Error fetching application:', error);
      return {
        error: {
          message: '获取申请详情失败',
          code: error.code,
          details: error
        }
      };
    }
  }

  // 创建申请
  static async createApplication(formData: AdoptionFormData): Promise<ApiResponse<Application>> {
    try {
      const application: ApplicationInsert = {
        pet_id: formData.petId,
        user_name: formData.userName,
        user_email: formData.userEmail,
        user_phone: formData.userPhone,
        house_type: formData.houseType,
        ownership_type: formData.ownershipType,
        experience: formData.experience,
        reason: formData.reason,
        status: '审核中'
      };

      const { data, error } = await supabase
        .from('applications')
        .insert(application)
        .select()
        .single();

      if (error) throw error;

      // 更新宠物状态
      await PetService.updatePet(formData.petId, { status: '审核中' });

      const petResponse = await PetService.getPetById(formData.petId);
      const pet = petResponse.data;

      return {
        data: {
          ...(data as ApplicationRow),
          pet: pet!,
          progress: this.calculateProgress('审核中')
        }
      };
    } catch (error: any) {
      console.error('Error creating application:', error);
      return {
        error: {
          message: '创建申请失败',
          code: error.code,
          details: error
        }
      };
    }
  }

  // 更新申请状态
  static async updateApplicationStatus(
    id: string,
    status: '审核中' | '已通过' | '已完成' | '已拒绝'
  ): Promise<ApiResponse<Application>> {
    try {
      const { data, error } = await supabase
        .from('applications')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      const petResponse = await PetService.getPetById((data as ApplicationRow).pet_id);
      const pet = petResponse.data;

      return {
        data: {
          ...(data as ApplicationRow),
          pet: pet!,
          progress: this.calculateProgress(status)
        }
      };
    } catch (error: any) {
      console.error('Error updating application status:', error);
      return {
        error: {
          message: '更新申请状态失败',
          code: error.code,
          details: error
        }
      };
    }
  }

  // 删除申请
  static async deleteApplication(id: string): Promise<ApiResponse<void>> {
    try {
      const { error } = await supabase
        .from('applications')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return {};
    } catch (error: any) {
      console.error('Error deleting application:', error);
      return {
        error: {
          message: '删除申请失败',
          code: error.code,
          details: error
        }
      };
    }
  }

  // 计算进度百分比
  private static calculateProgress(status: string): number {
    switch (status) {
      case '审核中':
        return 50;
      case '已通过':
        return 75;
      case '已完成':
        return 100;
      case '已拒绝':
        return 0;
      default:
        return 0;
    }
  }
}
