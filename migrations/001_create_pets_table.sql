-- 创建宠物表
CREATE TABLE IF NOT EXISTS pets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  breed VARCHAR(100) NOT NULL,
  age VARCHAR(20) NOT NULL,
  gender VARCHAR(10) CHECK (gender IN ('公', '母')) NOT NULL,
  weight VARCHAR(20) NOT NULL,
  distance VARCHAR(20) NOT NULL,
  location VARCHAR(200) NOT NULL,
  image TEXT NOT NULL,
  tags TEXT[] NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(20) CHECK (status IN ('待领养', '审核中', '已通过')) DEFAULT '待领养',
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_pets_status ON pets(status);
CREATE INDEX IF NOT EXISTS idx_pets_breed ON pets(breed);

-- 创建更新时间戳触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_pets_updated_at
BEFORE UPDATE ON pets
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
