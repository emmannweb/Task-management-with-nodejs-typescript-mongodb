import { ErrorResponse } from "../utils/errorResponse";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel";

// export interface CustomRequest extends Request {
//   user?: IUser;
// }

interface DecodedToken {
  id: string;
}

//check if user is authenticated
export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;
  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse("You must Log in!", 401));
  }
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(new ErrorResponse("You must Log in!", 401));
  }
};

//middleware for admin
export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role === "user") {
    return next(new ErrorResponse("Access denied, you must be an Admin", 401));
  }
  next();
};
