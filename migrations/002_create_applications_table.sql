-- 创建领养申请表
CREATE TABLE IF NOT EXISTS applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  pet_id UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  user_name VARCHAR(100) NOT NULL,
  user_email VARCHAR(100) NOT NULL,
  user_phone VARCHAR(20) NOT NULL,
  house_type VARCHAR(50) NOT NULL,
  ownership_type VARCHAR(20) NOT NULL,
  experience VARCHAR(50) NOT NULL,
  reason TEXT NOT NULL,
  status VARCHAR(20) CHECK (status IN ('审核中', '已通过', '已完成', '已拒绝')) DEFAULT '审核中',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_applications_pet_id ON applications(pet_id);
CREATE INDEX IF NOT EXISTS idx_applications_user_email ON applications(user_email);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);

-- 创建更新时间戳触发器
CREATE TRIGGER update_applications_updated_at
BEFORE UPDATE ON applications
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
