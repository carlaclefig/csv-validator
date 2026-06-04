import jwt from "jsonwebtoken";

export function verifyAdmin(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        ok: false,
        message: "No autorizado, token no encontrado",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({
        ok: false,
        message: "Acceso denegado, se requiere rol admin",
      });
    }

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: "Token inválido o expirado",
    });
  }
}
