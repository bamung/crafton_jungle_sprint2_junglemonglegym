import { Router } from "express";
import { requireAuth, AuthedRequest } from "../middlewares/requireAuth";
import User from "../models/User"; // 실제 User 모델 경로/이름에 맞춰두세요.

const router = Router();

router.get("/me", requireAuth, async (req: AuthedRequest, res) => {
  try {
    const user = await User.findById(req.userId).select("-password -passwordHash");
    if (!user) return res.status(404).json({ error: "Not found" });
    res.json(user);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
