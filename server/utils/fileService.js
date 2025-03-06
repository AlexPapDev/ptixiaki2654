import cloudinary from './cloudinaryConfig'

/**
 * Uploads an image buffer to Cloudinary
 * @param {Buffer} fileBuffer - The file buffer
 * @param {String} folder - Folder name for storage
 * @returns {Promise<String>} - Image URL
 */
const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url)
      }
    )
    stream.end(fileBuffer)
  })
}

export default uploadToCloudinary
