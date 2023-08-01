import express from "express";

const router = express.Router();

router.get("/api/users", (req, res) => {
  res.send({
    API: "Auth users",
    versao: "0.0.1",
  });
});

export { router as nameApiRouter };
