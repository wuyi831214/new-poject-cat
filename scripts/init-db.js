import { createClient } from '@supabase/supabase-js';

async function initializeDatabase() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials in environment variables');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    console.log('🔍 Checking database connection...');
    const { error } = await supabase.from('pets').select('count').limit(1);
    
    if (error) {
      console.error('❌ Database connection failed:', error.message);
      console.log('\n📋 Please run these SQL scripts in Supabase Dashboard → SQL Editor:');
      console.log('   1. migrations/001_create_pets_table.sql');
      console.log('   2. migrations/002_create_applications_table.sql');
      console.log('   3. migrations/003_create_favorites_table.sql');
      console.log('   4. migrations/004_create_messages_table.sql');
      console.log('   5. migrations/005_seed_data.sql (optional)');
    } else {
      console.log('✅ Database connection successful!');
      
      // Check if tables exist
      const { count: petsCount } = await supabase.from('pets').select('*', { count: 'exact', head: true });
      console.log(`🐕 Pets table: ${petsCount || 0} records`);
      
      const { count: appsCount } = await supabase.from('applications').select('*', { count: 'exact', head: true });
      console.log(`📝 Applications table: ${appsCount || 0} records`);
      
      const { count: favsCount } = await supabase.from('favorites').select('*', { count: 'exact', head: true });
      console.log(`❤️ Favorites table: ${favsCount || 0} records`);
      
      const { count: msgsCount } = await supabase.from('messages').select('*', { count: 'exact', head: true });
      console.log(`💬 Messages table: ${msgsCount || 0} records`);
      
      if ((petsCount || 0) === 0) {
        console.log('\n⚠️  Database is empty. Consider running seed data script.');
      }
    }
  } catch (error) {
    console.error('❌ Error initializing database:', error.message);
  }
}

initializeDatabase();
