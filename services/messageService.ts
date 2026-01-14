import { supabase, Database } from '../lib/supabase';
import { Message, ApiResponse } from '../types-extended';

type MessageRow = Database['public']['Tables']['messages']['Row'];
type MessageInsert = Database['public']['Tables']['messages']['Insert'];

export class MessageService {
  // 获取用户消息
  static async getUserMessages(userId: string, limit: number = 50): Promise<ApiResponse<Message[]>> {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: true })
        .limit(limit);

      if (error) throw error;

      return { data: data as Message[] };
    } catch (error: any) {
      console.error('Error fetching messages:', error);
      return {
        error: {
          message: '获取消息失败',
          code: error.code,
          details: error
        }
      };
    }
  }

  // 发送用户消息
  static async sendUserMessage(userId: string, content: string): Promise<ApiResponse<Message>> {
    try {
      const message: MessageInsert = {
        user_id: userId,
        content,
        role: 'user'
      };

      const { data, error } = await supabase
        .from('messages')
        .insert(message)
        .select()
        .single();

      if (error) throw error;

      return { data: data as Message };
    } catch (error: any) {
      console.error('Error sending user message:', error);
      return {
        error: {
          message: '发送消息失败',
          code: error.code,
          details: error
        }
      };
    }
  }

  // 发送助手消息
  static async sendAssistantMessage(userId: string, content: string): Promise<ApiResponse<Message>> {
    try {
      const message: MessageInsert = {
        user_id: userId,
        content,
        role: 'assistant'
      };

      const { data, error } = await supabase
        .from('messages')
        .insert(message)
        .select()
        .single();

      if (error) throw error;

      return { data: data as Message };
    } catch (error: any) {
      console.error('Error sending assistant message:', error);
      return {
        error: {
          message: '发送消息失败',
          code: error.code,
          details: error
        }
      };
    }
  }

  // 删除消息
  static async deleteMessage(id: string): Promise<ApiResponse<void>> {
    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return {};
    } catch (error: any) {
      console.error('Error deleting message:', error);
      return {
        error: {
          message: '删除消息失败',
          code: error.code,
          details: error
        }
      };
    }
  }

  // 清空用户消息
  static async clearUserMessages(userId: string): Promise<ApiResponse<void>> {
    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('user_id', userId);

      if (error) throw error;

      return {};
    } catch (error: any) {
      console.error('Error clearing messages:', error);
      return {
        error: {
          message: '清空消息失败',
          code: error.code,
          details: error
        }
      };
    }
  }
}
