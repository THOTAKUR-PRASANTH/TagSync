import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// Validation function for user data
const validateUserData = (data: any) => {
  const errors: string[] = [];
  
  if (!data.username || data.username.trim().length < 3) {
    errors.push('Username must be at least 3 characters long');
  }
  
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Full name must be at least 2 characters long');
  }
  
  // Phone is optional but if provided, must be valid
  if (data.phone && data.phone.trim()) {
    if (!/^[\+]?[1-9][\d]{0,15}$/.test(data.phone.replace(/\s/g, ''))) {
      errors.push('Please provide a valid phone number');
    }
  }
  
  if (!data.gender) {
    errors.push('Gender selection is required');
  }
  
  if (!data.dob) {
    errors.push('Date of birth is required');
  } else {
    const today = new Date();
    const birthDate = new Date(data.dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 13 || age > 120) {
      errors.push('Age must be between 13 and 120 years');
    }
  }
  
  if (!data.avatar_url) {
    errors.push('Profile picture is required');
  }
  
  return errors;
};

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const body = await req.json();

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Validate input data
    const validationErrors = validateUserData(body);
    if (validationErrors.length > 0) {
      return NextResponse.json({ 
        error: 'Validation failed', 
        details: validationErrors 
      }, { status: 400 });
    }

    // Sanitize and prepare data
    const { username, name, phone, gender, dob, avatar_url } = body;
    const sanitizedData = {
      user_id: user.id,
      username: username.trim(),
      name: name.trim(),
      phone: phone.trim(),
      gender: gender.trim(),
      dob: dob,
      avatar_url: avatar_url,
      email: user.email, // Include email from authenticated user
      updated_at: new Date().toISOString()
    };

    // Check if username is already taken by another user
    const { data: existingUser, error: checkError } = await supabase
      .from('user_details')
      .select('user_id')
      .eq('username', sanitizedData.username)
      .neq('user_id', user.id)
      .maybeSingle();

    if (checkError) {
      console.error('Error checking username:', checkError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    if (existingUser) {
      return NextResponse.json({ 
        error: 'Username already taken' 
      }, { status: 409 });
    }

    // Update user_details table
    const { error: updateError } = await supabase
      .from('user_details')
      .upsert(sanitizedData, {
        onConflict: 'user_id'
      });

    if (updateError) {
      console.error('Update error:', updateError);
      return NextResponse.json({ 
        error: 'Failed to update profile',
        details: updateError.message 
      }, { status: 500 });
    }

    // Log successful update
    console.log(`Profile updated successfully for user: ${user.id}`);

    return NextResponse.json({ 
      success: true, 
      message: 'Profile updated successfully',
      data: sanitizedData
    });

  } catch (error) {
    console.error('Unexpected error in profile update:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Fetch user details for pre-filling the edit profile form
export async function GET(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: userDetails, error } = await supabase
      .from('user_details')
      .select('username, name, phone, gender, dob, avatar_url, email')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching user details:', error);
      return NextResponse.json({ 
        error: 'Failed to fetch user details',
        details: error.message 
      }, { status: 500 });
    }

    if (!userDetails) {
      // Return empty form if no profile exists yet
      return NextResponse.json({ 
        userDetails: {
          username: '',
          name: '',
          phone: '',
          gender: '',
          dob: '',
          avatar_url: '',
          email: user.email || ''
        }
      });
    }

    return NextResponse.json({ userDetails });

  } catch (error) {
    console.error('Unexpected error in profile fetch:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
