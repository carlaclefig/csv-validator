import { Router } from "express";
import { login } from "../services/auth.service.js";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const { token, user } = await login(email, password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 8 * 60 * 60 * 1000,
    });

    res.json({
      ok: true,
      data: user,
    });
  } catch (error) {
    res.status(401).json({
      ok: false,
      message: error.message,
    });
  }
});

export default router;
