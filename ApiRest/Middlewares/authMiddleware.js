import jwt from 'jsonwebtoken';
import User from '../Models/User.js';

const authMiddleware = async (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    const user = await User.findById(req.user.id);
    if (!user || user.role !== 'admin' ) {
      return res.status(403).json({ msg: 'Authorization denied' });
    }
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export default authMiddleware;
