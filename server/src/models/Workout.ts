import { Schema, model, type Document } from "mongoose";

export type Group = "shoulder" | "chest" | "back" | "legs" | "cardio";
export type Difficulty = "easy" | "mid" | "hard";

export interface IWorkout extends Document {
  id: string;        // 슬러그
  title: string;
  group: Group;
  difficulty: Difficulty;
  cues?: string[];
}

const schema = new Schema<IWorkout>({
  id: { type: String, required: true, unique: true, index: true },
  title: { type: String, required: true },
  group: { type: String, required: true },
  difficulty: { type: String, required: true },
  cues: [String],
});

export default model<IWorkout>("Workout", schema);
