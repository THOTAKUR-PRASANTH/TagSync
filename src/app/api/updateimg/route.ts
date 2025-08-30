import { NextResponse } from "next/server";
import ImageKit from "imagekit";

// Initialize ImageKit only if environment variables are available
let imagekit: ImageKit | null = null;

try {
  if (process.env.IMAGEKIT_PUBLIC_KEY && 
      process.env.IMAGEKIT_PRIVATE_KEY && 
      process.env.IMAGEKIT_URL_ENDPOINT) {
    imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    });
  }
} catch (error) {
  console.warn("ImageKit initialization failed:", error);
}

// GET method for authentication parameters - this is what ImageKit needs
export async function GET() {
  try {
    console.log("Auth endpoint hit for ImageKit authentication");
    
    // Check if ImageKit is properly initialized
    if (!imagekit) {
      return NextResponse.json({
        error: "ImageKit not configured",
        message: "Please check environment variables"
      }, { status: 503 });
    }
    
    // Get authentication parameters from ImageKit
    const authParams = imagekit.getAuthenticationParameters();
    
    console.log("Auth params generated successfully");
    
    // Return the authentication parameters that ImageKit needs
    return NextResponse.json(authParams);
  } catch (error) {
    console.error("Error in GET /api/updateimg:", error);
    return NextResponse.json({ 
      error: "Failed to get authentication parameters",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

// POST method for file uploads
export async function POST(request: Request) {
  try {
    // Check if ImageKit is available
    if (!imagekit) {
      return NextResponse.json({ 
        error: "ImageKit service unavailable",
        message: "Please check configuration"
      }, { status: 503 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const username = formData.get('username') as string;
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: "Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed" 
      }, { status: 400 });
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ 
        error: "File too large. Maximum size is 5MB" 
      }, { status: 400 });
    }

    // Get file extension
    const fileExtension = file.name.split('.').pop() || 'jpg';
    
    // Create filename with username and timestamp
    const timestamp = Date.now();
    const fileName = username ? `${username}_${timestamp}.${fileExtension}` : `user_${timestamp}.${fileExtension}`;

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to ImageKit
    const result = await imagekit.upload({
      file: buffer,
      fileName: fileName,
      folder: "profile-pictures",
    });

    console.log("File uploaded successfully:", result);
    
    return NextResponse.json({
      success: true,
      url: result.url,
      fileId: result.fileId,
      fileName: result.name
    });

  } catch (error) {
    console.error("Error in POST /api/updateimg:", error);
    return NextResponse.json({ 
      error: "Failed to upload file",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
