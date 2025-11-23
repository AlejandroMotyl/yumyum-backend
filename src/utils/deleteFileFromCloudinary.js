import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Deletes a file from Cloudinary using the URL
 * @param {string} url - Full Cloudinary URL
 */
export async function deleteFileFromCloudinary(url) {
  if (!url) return;

  try {
    const parts = url.split('/');
    const versionIndex = parts.findIndex(
      (part) => part.startsWith('v') && /^\d+$/.test(part.slice(1)),
    );
    const publicIdWithExt = parts.slice(versionIndex + 1).join('/');
    const publicId = publicIdWithExt.replace(/\.[a-z]+$/, '');

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image',
    });

    return result;
  } catch (err) {
    console.error('Error deleting from Cloudinary:', err);
    throw err;
  }
}
