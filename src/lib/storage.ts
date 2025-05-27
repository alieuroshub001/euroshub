export const uploadFile = async (file: File, folder: string): Promise<string> => {
  // In a real app, you would upload to S3, Cloudinary, etc.
  // This is a mock implementation that returns a fake URL
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`https://example.com/${folder}/${file.name}-${Date.now()}`);
    }, 500);
  });
};