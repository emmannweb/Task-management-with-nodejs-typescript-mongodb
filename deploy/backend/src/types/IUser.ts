import { Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  active: boolean;
  resetPasswordToken: string | undefined;
  resetPasswordExpire: Date | undefined;
}

export interface IUserDocument extends IUser, Document {
  comparePassword: (password: string) => Promise<boolean>;
  getJwtToken: () => string;
  getResetPasswordToken: () => string;
}
