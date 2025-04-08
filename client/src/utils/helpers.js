const getCloudinaryUrl = (publicId, options = {}) => {
  if (!publicId) return ''

  if (Array.isArray(publicId)) return publicId.map(pId => _getSingleUrl(pId, options))
  else return _getSingleUrl(publicId, options)
}

const _getSingleUrl = (publicId, options) => {
  const baseUrl = 'https://res.cloudinary.com/djuuwduyx/image/upload/'
  const { width = 300, crop = 'fill', quality = 'auto', gravity = 'auto' } = options
  const transformation = `w_${width},c_${crop},q_${quality},g_${gravity}`
  return `${baseUrl}${transformation}/${publicId}`
}
export {
  getCloudinaryUrl
}