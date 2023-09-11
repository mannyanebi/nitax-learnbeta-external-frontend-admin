export function base64StringToFile(base64String: string, filename: string, contentType?: string): File {
  // Split the base64 string to get the file name and content
  const parts = base64String.split(";base64,");
  if (contentType === undefined) {
    contentType = parts[0].split(":")[1];
  }
  if (filename === undefined) {
    filename = "file"; // Default filename if not provided
  }

  // Convert the raw data to a Blob
  const raw = atob(parts[1]);
  const data = Array.from(raw).map((char) => char.charCodeAt(0));
  const blob = new Blob([new Uint8Array(data)], {
    type: contentType,
  });

  // Create a File object with the Blob and filename
  return new File([blob], filename, { type: contentType });
}