import { Router } from "express";
import { AuthedRequest, requireAuth } from "../middlewares/requireAuth";
import WeightEntry from "../models/WeightEntry";

const router = Router();

function isKey(s?: string) {
  return !!s && /^\d{4}-\d{2}-\d{2}$/.test(s);
}

router.get("/weights", requireAuth, async (req: AuthedRequest, res) => {
  const { from, to } = req.query as any;
  const q: any = { userId: req.userId };
  if (isKey(from) || isKey(to)) {
    q.date = {};
    if (isKey(from)) q.date.$gte = from;
    if (isKey(to)) q.date.$lte = to;
  }
  const list = await WeightEntry.find(q).sort({ date: 1 });
  res.json(list);
});

router.put("/weights/:date", requireAuth, async (req: AuthedRequest, res) => {
  const dateKey = req.params.date;
  if (!isKey(dateKey)) return res.status(400).json({ message: "Invalid date" });

  const payload = {
    weightKg: Number(req.body?.weightKg),
    bodyFatPct: req.body?.bodyFatPct == null ? undefined : Number(req.body.bodyFatPct),
    muscleKg: req.body?.muscleKg == null ? undefined : Number(req.body.muscleKg),
    memo: String(req.body?.memo || ""),
  };
  if (!payload.weightKg) return res.status(400).json({ message: "weightKg required" });

  const doc = await WeightEntry.findOneAndUpdate(
    { userId: req.userId, date: dateKey },
    { $set: payload },
    { new: true, upsert: true }
  );
  res.json(doc);
});

export default router;
