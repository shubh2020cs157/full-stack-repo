import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    // Get the session from the server
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized - No valid session found",
        },
        { status: 401 }
      );
    }

    // Return protected data
    return NextResponse.json({
      success: true,
      message: "Successfully accessed protected endpoint",
      data: {
        user: {
          id: session.user?.id,
          name: session.user?.name,
          email: session.user?.email,
          image: session.user?.image,
          role: session.user?.role,
        },
        session: {
          expires: session.expires,
        },
        timestamp: new Date().toISOString(),
        endpoint: "/api/protected",
      },
    });
  } catch (error) {
    console.error("Protected API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get the session from the server
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized - No valid session found",
        },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Return success with the data
    return NextResponse.json({
      success: true,
      message: "Successfully processed protected POST request",
      data: {
        user: {
          id: session.user?.id,
          name: session.user?.name,
          email: session.user?.email,
        },
        receivedData: body,
        timestamp: new Date().toISOString(),
        endpoint: "/api/protected",
      },
    });
  } catch (error) {
    console.error("Protected API POST error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
