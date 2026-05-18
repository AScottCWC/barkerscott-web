import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const bundleName = searchParams.get("bundle");

    if (!bundleName) {
      return NextResponse.json({ error: "Missing bundle parameter" }, { status: 400 });
    }

    const bundleMap: any = {
      "care-home-starter": "care-home-starter.zip",
      "dental-pro": "dental-pro.zip",
      "aesthetic-complete": "aesthetic-complete.zip",
      "ultimate-package": "ultimate-package.zip",
    };

    const fileName = bundleMap[bundleName];
    if (!fileName) {
      return NextResponse.json({ error: "Invalid bundle" }, { status: 400 });
    }

    const filePath = `./public/downloads/bundles/${fileName}`;

    return NextResponse.json({
      success: true,
      downloadUrl: `https://barkerscott-web.vercel.app/downloads/bundles/${fileName}`,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}