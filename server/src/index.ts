// server/src/index.ts
import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

import authRouter from "./routes/auth";
import meRouter from "./routes/me";
import dailyRouter from "./routes/daily";
import weightsRouter from "./routes/weights";
import dietMemoRouter from "./routes/dietMemo";
import diaryRouter from "./routes/diary";
import favoritesRouter from "./routes/favorites";

// 운동 목록 (워크아웃 카탈로그)
import workoutsRouter from "./routes/workouts";
// ✅ 운동 기록(저장/조회) 라우터
import workoutLogsRouter from "./routes/workoutLogs";

const app = express();

// CORS
const allow = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
app.use(cors({ origin: allow.length ? allow : true, credentials: true }));

app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

// 헬스체크
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

// Auth
app.use("/api/auth", authRouter);
app.use("/api/auth", meRouter);

// 기존 기능
app.use("/api", diaryRouter);
app.use("/api", dailyRouter);
app.use("/api", weightsRouter);
app.use("/api", dietMemoRouter);
app.use("/api", favoritesRouter);

// 워크아웃 카탈로그: 최종 경로 /api/workouts/...
app.use("/api/workouts", workoutsRouter);

// ✅ 운동 기록 저장/조회: 최종 경로 /api/workout-logs, /api/workout-logs/:date ...
app.use("/api", workoutLogsRouter);

const PORT = Number(process.env.PORT || 4000);

async function bootstrap() {
  if (!process.env.MONGODB_URI) {
    console.error("Missing MONGODB_URI");
    process.exit(1);
  }
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Mongo connected");

  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
}

bootstrap().catch((e) => {
  console.error(e);
  process.exit(1);
});
