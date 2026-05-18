import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const bundleName = searchParams.get("bundle");

    const bundleMap: Record<string, string> = {
      "care-home-starter": "/downloads/bundles/care-home-starter.zip",
      "dental-pro": "/downloads/bundles/dental-pro.zip",
      "aesthetic-complete": "/downloads/bundles/aesthetic-complete.zip",
      "ultimate-package": "/downloads/bundles/ultimate-package.zip",
    };

    if (!bundleName || !bundleMap[bundleName]) {
      return NextResponse.json({ error: "Invalid bundle" }, { status: 400 });
    }

    return NextResponse.redirect(bundleMap[bundleName], { status: 307 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}