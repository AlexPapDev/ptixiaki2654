import multer from 'multer'

// Multer Configuration (store file temporarily in memory)
const storage = multer.memoryStorage()
const upload = multer({ storage })

export default upload
