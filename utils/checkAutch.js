import jwt from "jsonwebtoken";

export function checkAutch(req, res, next) {
  const token = (req.headers.autorization || "").replace(/Bearer\s?/, "");
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      req.userId = decoded.id;

      next();
    } catch (error) {
      res.json({
        message: "Нет доступа.",
      });
    }
  }
}
