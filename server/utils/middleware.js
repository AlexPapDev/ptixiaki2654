import jwt from 'jsonwebtoken'
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1] // Extract token
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) // Decode token
    req.user = decoded // Attach user data (including role) to req
    next()
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' })
  }
}

const checkRole = (roles) => (req, res, next) => {
  console.log('checkRole')
  const userRole = req.user.role // Assume user is attached to req
  console.log(req.user, roles)
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