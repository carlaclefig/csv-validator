import { Router } from "express";
import multer from "multer";
import { verifyAdmin } from "../middleware/auth.middleware.js";
import { processCSV } from "../services/csv.service.js";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "text/csv" || file.originalname.endsWith(".csv")) {
      cb(null, true);
    } else {
      cb(new Error("Solo se permiten archivos CSV"));
    }
  },
});

router.post(
  "/upload",
  verifyAdmin,
  (req, res, next) => {
    upload.single("file")(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          message: err.message,
        });
      }
      next();
    });
  },
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          ok: false,
          message: "No se proporcionó ningún archivo",
        });
      }

      const { success, errors } = await processCSV(req.file.buffer);

      res.json({
        ok: true,
        data: { success, errors },
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        message: error.message,
      });
    }
  },
);

export default router;
