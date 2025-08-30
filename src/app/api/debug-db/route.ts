import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user_details table exists and get its structure
    const { data: tableInfo, error: tableError } = await supabase
      .from('user_details')
      .select('*')
      .limit(1);

    if (tableError) {
      return NextResponse.json({ 
        error: 'Table error', 
        details: tableError.message,
        code: tableError.code 
      }, { status: 500 });
    }

    // Get user's current profile data
    const { data: userProfile, error: profileError } = await supabase
      .from('user_details')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    // Get auth user info
    const authUserInfo = {
      id: user.id,
      email: user.email,
      email_confirmed_at: user.email_confirmed_at,
      created_at: user.created_at,
      updated_at: user.updated_at
    };

    return NextResponse.json({
      success: true,
      tableStructure: tableInfo.length > 0 ? Object.keys(tableInfo[0]) : [],
      userProfile: userProfile || 'No profile found',
      authUser: authUserInfo,
      message: 'Database schema check completed'
    });

  } catch (error) {
    console.error('Debug DB error:', error);
    return NextResponse.json({ 
      error: 'Debug failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
