import { NextResponse } from "next/server";

export async function GET() {
  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Downloads - Barker Scott</title></head>
<body style="font-family:Arial;max-width:1000px;margin:0 auto;padding:40px 20px">
<h1 style="color:#0066cc">📥 Download Your Templates</h1>
<p>All your files are ready to download:</p>
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:15px">
<a href="/downloads/policies/care-home/safeguarding-adults-policy.docx.docx" download style="padding:15px;background:#e3f2fd;border:2px solid #0066cc;border-radius:6px;text-decoration:none;color:#0066cc;text-align:center;font-weight:bold">⬇️ Safeguarding Adults Policy</a>
<a href="/downloads/policies/dental/safeguarding-children-vulnerable-adults-policy.docx.docx" download style="padding:15px;background:#e3f2fd;border:2px solid #0066cc;border-radius:6px;text-decoration:none;color:#0066cc;text-align:center;font-weight:bold">⬇️ Dental Safeguarding Policy</a>
<a href="/downloads/risk-assessments/care-home/safeguarding-adults.docx.docx" download style="padding:15px;background:#e3f2fd;border:2px solid #0066cc;border-radius:6px;text-decoration:none;color:#0066cc;text-align:center;font-weight:bold">⬇️ Safeguarding Risk Assessment</a>
</div>
</body>
</html>`;
  return new NextResponse(html, { headers: { "Content-Type": "text/html" } });
}