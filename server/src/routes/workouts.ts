import { Router } from "express";
import Workout from "../models/Workout";

const r = Router();

// 최초 1회 시드
let seeded = false;
const SEED = [
  { id:"lat-raise", title:"덤벨 레터럴 레이즈", group:"shoulder", difficulty:"easy" },
  { id:"ohp",       title:"바벨 오버헤드 프레스", group:"shoulder", difficulty:"mid"  },
  { id:"arnold",    title:"아놀드 프레스",       group:"shoulder", difficulty:"hard" },
  { id:"pushup",    title:"푸쉬업",               group:"chest",    difficulty:"easy" },
  { id:"bench",     title:"벤치프레스",           group:"chest",    difficulty:"mid"  },
  { id:"dip",       title:"디클라인 딥스",        group:"chest",    difficulty:"hard" },
  { id:"row",       title:"시티드 로우",          group:"back",     difficulty:"easy" },
  { id:"pullup",    title:"풀업",                 group:"back",     difficulty:"mid"  },
  { id:"deadlift",  title:"데드리프트",           group:"back",     difficulty:"hard" },
  { id:"legpress",  title:"레그프레스",           group:"legs",     difficulty:"easy" },
  { id:"squat",     title:"바벨 스쿼트",          group:"legs",     difficulty:"mid"  },
  { id:"bulgarian", title:"불가리안 스플릿 스쿼트",group:"legs",    difficulty:"hard" },
  { id:"walk",      title:"빠르게 걷기",          group:"cardio",   difficulty:"easy" },
  { id:"run",       title:"조깅",                 group:"cardio",   difficulty:"mid"  },
  { id:"hiit",      title:"HIIT 인터벌",          group:"cardio",   difficulty:"hard" },
];

async function ensureSeed() {
  if (seeded) return;
  const count = await Workout.estimatedDocumentCount();
  if (count === 0) await Workout.insertMany(SEED);
  seeded = true;
}

r.get("/", async (req, res) => {
  await ensureSeed();
  const { group, difficulty, q } = req.query as any;
  const cond: any = {};
  if (group) cond.group = group;
  if (difficulty) cond.difficulty = difficulty;
  if (q) cond.title = new RegExp(String(q), "i");
  const list = await Workout.find(cond).lean();
  // _id 제거해서 프론트와 동일 구조로
  res.json(list.map(({ _id, ...rest }) => rest));
});

export default r;
