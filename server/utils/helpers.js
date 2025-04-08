import cloudinary from '../config/cloudinaryConfig.js'
import CONSTANTS from './serverConstants.js'
import axios from 'axios'
const transliterateString = (str) => {
  return str.split('').map(char => CONSTANTS.GREEK_TO_ENGLISH_MAP[char] || char).join('');
}

const removeGreekTonos = (str) => {
  return str.split('').map(char => CONSTANTS.TONOS_MAP[char] || char).join('');
}

const getAddressDetails = async (lat, lon) => {
  try {
    const response = await axios.get(CONSTANTS.GEOCODE_API_URL, {
      params: {
        lat,
        lon,
        format: 'json',
      },
    })
    return response.data.address
  } catch (error) {
    console.error(error)
    return { street: null, house_number: null, city: null, postcode: null }
  }
}

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
        else resolve(result.public_id)
      }
    )
    stream.end(fileBuffer)
  })
}

export { transliterateString, removeGreekTonos, getAddressDetails, uploadToCloudinary }