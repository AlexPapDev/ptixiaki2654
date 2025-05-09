import jwt from 'jsonwebtoken'
import userService from '../services/userService.js'
const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1] // Extract token
  console.log('token', token)
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  try {
    const user = await userService.verifyToken(token)
    if (!user) return res.status(401).json({ message: "Invalid token" })
    req.user = user
    next()
  } catch (err) {
    console.log(err)
    return res.status(403).json({ error: 'Invalid token' })
  }
}

const checkRole = (roles) => (req, res, next) => {
  console.log('checkRole')
  const userRole = req.user.role // Assume user is attached to req
  // console.log(req.user, roles)
  if (!roles.includes(userRole)) {
    console.log(req.user, roles)
    return res.status(403).json({ error: 'Access denied' })
  }
  next()
}

export { 
  authenticateUser,
  checkRole,
}