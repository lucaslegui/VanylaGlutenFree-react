const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ msg: 'Acceso denegado' });
        }
        next();
    };
};

export default roleMiddleware;
