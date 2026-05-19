export async function downloadDriveFile(fileId: string, fileName: string) {
  const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${process.env.NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Download failed");
  const blob = await response.blob();
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
}

export async function listFolderFiles(folderId: string) {
  const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}' in parents&fields=files(id,name)&key=${process.env.NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("List failed");
  return response.json();
}
