import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload images to Cloudinary
export const uploadToCloudinary = async (file: File) => {
  // Step 1: Convert the file to a Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer); // Convert ArrayBuffer to Buffer

  // Step 2: Upload the buffer to Cloudinary
  const result = await cloudinary.uploader
    .upload_stream(
      {
        folder: '3zero-digital-templates', // Specify the folder in Cloudinary
      },
      (error, result) => {
        if (error) {
          throw error; // Handle the error if upload fails
        }
        console.log('File uploaded to Cloudinary:', result?.secure_url);
      },
    )
    .end(buffer); // Pass the buffer to the upload stream
};

export default cloudinary;
