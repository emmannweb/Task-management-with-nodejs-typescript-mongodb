import { Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  active: boolean;
  resetPasswordToken: string;
  resetPasswordExpire: Date;
}

export interface IUserDocument extends IUser, Document {
  comparePassword: () => Promise<boolean>;
  getJwtToken: () => string;
  getResetPasswordToken: () => string;
}
