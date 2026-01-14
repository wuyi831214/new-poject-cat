import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigrations() {
  const migrationsDir = path.join(__dirname, '../migrations');
  
  try {
    const files = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();

    console.log('📦 Found', files.length, 'migration files');
    console.log('\n📋 Migration files:');
    files.forEach((file, index) => {
      console.log(`   ${index + 1}. ${file}`);
    });

    console.log('\n⚠️  To run these migrations, you need to:');
    console.log('   1. Go to your Supabase dashboard: https://app.supabase.com');
    console.log('   2. Navigate to SQL Editor');
    console.log('   3. Run each migration file in order');
    console.log('\n📄 Or use the Supabase CLI:');
    console.log('   npx supabase db push');

  } catch (error) {
    console.error('❌ Error reading migrations:', error.message);
    process.exit(1);
  }
}

runMigrations();
