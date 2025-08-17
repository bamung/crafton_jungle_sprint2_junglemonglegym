import { Schema, model, Types } from "mongoose";

const weightEntrySchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true, index: true },
    // YYYY-MM-DD
    date: { type: String, required: true },
    weightKg: { type: Number, required: true },
    bodyFatPct: { type: Number },
    muscleKg: { type: Number },
    memo: { type: String, default: "" },
  },
  { timestamps: true }
);

weightEntrySchema.index({ userId: 1, date: 1 }, { unique: true });

export default model("WeightEntry", weightEntrySchema);
