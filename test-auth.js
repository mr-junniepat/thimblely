const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load .env file
function loadEnv() {
  const envPath = path.join(__dirname, 'apps', 'mobile', '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split('\n').forEach((line) => {
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim();
        process.env[key] = value;
      }
    });
  }
}

loadEnv();

// Test Supabase connection
async function testAuth() {
  console.log('🧪 Testing Supabase Auth Flow\n');

  // Get credentials from environment or use defaults
  const supabaseUrl =
    process.env.EXPO_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    'YOUR_SUPABASE_URL_HERE';
  const supabaseAnonKey =
    process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    'YOUR_SUPABASE_ANON_KEY_HERE';

  if (supabaseUrl === 'YOUR_SUPABASE_URL_HERE') {
    console.log(
      '❌ Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables'
    );
    console.log('Or update apps/mobile/.env with your Supabase credentials');
    return;
  }

  console.log('✅ Connecting to Supabase...');
  console.log(`URL: ${supabaseUrl.substring(0, 30)}...`);
  console.log('');

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Test 1: Health check
  console.log('1️⃣ Testing connection...');
  try {
    // Just check if we can query, don't query profiles table
    const { error } = await supabase
      .from('workspaces')
      .select('count')
      .limit(1);
    if (error && error.code !== 'PGRST116' && !error.message.includes('RLS')) {
      throw error;
    }
    console.log('   ✅ Connected to Supabase\n');
  } catch (error) {
    console.log(
      '   ⚠️ Table query failed (expected), but auth should work:',
      error.message
    );
    console.log('');
  }

  // Test 2: Sign up
  console.log('2️⃣ Testing sign-up...');
  const testEmail = `test_${Date.now()}@yopmail.com`; // Using .com domain
  const testPassword = 'TestPassword123!';

  try {
    const { data, error } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
      options: {
        data: {
          role: 'customer',
          country: 'US',
        },
      },
    });

    if (error) {
      console.log('   ❌ Sign-up failed:', error.message);
    } else {
      console.log('   ✅ Sign-up successful!');
      console.log('   User ID:', data.user?.id);
      console.log('   Email:', data.user?.email);
      console.log('   Confirmed:', data.user?.confirmed_at ? 'Yes' : 'No');
      console.log('');

      // Test 3: Sign in
      console.log('3️⃣ Testing sign-in...');
      const { data: signInData, error: signInError } =
        await supabase.auth.signInWithPassword({
          email: testEmail,
          password: testPassword,
        });

      if (signInError) {
        console.log('   ❌ Sign-in failed:', signInError.message);
      } else {
        console.log('   ✅ Sign-in successful!');
        console.log(
          '   Access token:',
          signInData.session?.access_token.substring(0, 30) + '...'
        );
      }
    }
  } catch (error) {
    console.log('   ❌ Error:', error.message);
  }

  console.log('\n✅ Test complete!');
}

testAuth();
