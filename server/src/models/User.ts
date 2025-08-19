// server/src/models/User.ts
import { Schema, model, type Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  nickname: string;
  resetTokenHash?: string | null;
  resetTokenExp?: Date | null;
  // ✅ 추가: timestamps:true가 생성하는 필드 타입 선언
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    nickname: { type: String, required: true },
    resetTokenHash: { type: String, default: null },
    resetTokenExp: { type: Date, default: null },
  },
  {
    timestamps: true,
    versionKey: false, // 선택: __v 숨김
  }
);

// ✅ 선택: 응답 직렬화 시 민감정보 제거 + _id → id 노출
schema.set("toJSON", {
  transform(_doc, ret: any) {
    if (ret._id) {
      ret.id = ret._id;
      delete ret._id;
    }
    delete ret.passwordHash;
    delete ret.resetTokenHash;
    delete ret.resetTokenExp;
    return ret;
  },
});

export default model<IUser>("User", schema);
