import createHttpError from "http-errors";

export const adminOnlyMiddleware = async (req, res, next) => {
  if (req.user.role === "Admin") {
    next();
  } else {
    next(createHttpError(403, "Admins only endpoint"));
  }
};
