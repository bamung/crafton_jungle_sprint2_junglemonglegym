import { Schema, model, type Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  nickname: string;
  resetTokenHash?: string | null;
  resetTokenExp?: Date | null;
}

const schema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    nickname: { type: String, required: true },
    resetTokenHash: { type: String, default: null },
    resetTokenExp: { type: Date, default: null },
  },
  { timestamps: true }
);

export default model<IUser>("User", schema);
