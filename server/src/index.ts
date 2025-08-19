import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";


// 라우터들(전부 default export여야 함)
import authRouter from "./routes/auth";          // 말랑핏 기존 auth 라우터
import meRouter from "./routes/me";              // /api/auth/me
import dailyRouter from "./routes/daily";        // 데일리 상태
import weightsRouter from "./routes/weights";    // 체중 기록
import dietMemoRouter from "./routes/dietMemo";  // 주간 식단 메모
import diaryRouter from "./routes/diary";
const app = express();

// CORS
const allow = (process.env.CORS_ORIGIN || "").split(",").map(s => s.trim()).filter(Boolean);
app.use(cors({ origin: allow.length ? allow : true, credentials: true }));

app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

// 헬스체크
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

// ---- 라우트 마운트 (중요: 함수 호출하지 말고 그대로 전달) ----
app.use("/api/auth", authRouter);
app.use("/api/auth", meRouter);
app.use("/api", diaryRouter);

app.use("/api", dailyRouter);
app.use("/api", weightsRouter);
app.use("/api", dietMemoRouter);
// ---------------------------------------------------------------

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
