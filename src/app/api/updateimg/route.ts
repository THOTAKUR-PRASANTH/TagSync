import { NextResponse } from "next/server";
import ImageKit from "imagekit";

// Initialize ImageKit with environment variables
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "public_arDadiBV0Zg7Yn6twxNLjz33dTk=",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/jt0unlio3s",
});

// GET method for authentication parameters - this is what ImageKit needs
export async function GET() {
  try {
    console.log("Auth endpoint hit for ImageKit authentication");
    
    // Check if ImageKit is properly initialized
    if (!imagekit) {
      throw new Error("ImageKit not initialized");
    }
    
    // Check if private key is available
    if (!process.env.IMAGEKIT_PRIVATE_KEY) {
      console.warn("No private key provided, using fallback authentication");
      // Return a basic authentication response when no private key is available
      return NextResponse.json({
        token: "fallback-token",
        expire: Math.floor(Date.now() / 1000) + 3600,
        signature: "fallback-signature"
      });
    }
    
    // Get authentication parameters from ImageKit
    const authParams = imagekit.getAuthenticationParameters();
    
    console.log("Auth params generated:", authParams);
    console.log("ImageKit initialized successfully");
    
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

// POST method for file uploads (if you want to handle uploads server-side)
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const username = formData.get('username') as string;
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
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
