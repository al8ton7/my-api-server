import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// Simple auth middleware
function requireInternalKey(req, res, next) {
  const authHeader = req.headers["authorization"] || "";
  const expected = `Bearer ${process.env.INTERNAL_API_KEY}`;

  if (authHeader !== expected) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

// Health check (no auth so you can still visit in browser)
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "API server is running" });
});

// Main endpoint your GPT will call
app.post("/render/capcut", requireInternalKey, async (req, res) => {
  const { template_id, script, scenes, captions, aspect_ratio } = req.body;

  console.log("Received render request:", {
    template_id,
    script,
    scenes,
    captions,
    aspect_ratio,
  });

  try {
    // 🔴 PLACEHOLDER for real video API call (step 2 below)
    // For now, still return fake URLs so nothing breaks.
    const fakeId = Date.now();

    return res.json({
      video_url: `https://example.com/videos/render-${fakeId}.mp4`,
      thumbnail_url: `https://example.com/thumbnails/render-${fakeId}.jpg`,
    });
  } catch (err) {
    console.error("Error rendering video:", err.message);
    return res.status(500).json({ error: "Video render failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API server running on port ${PORT}`));
