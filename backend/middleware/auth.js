import jwt from "jsonwebtoken";

export const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

// Exige un header "Authorization: Bearer <token>" válido
export const requireAuth = (req, res, next) => {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "No autenticado" });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET); // { id, role, iat, exp }
    next();
  } catch {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};
