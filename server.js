import express from "express";

const app = express();
app.use(express.json());

// Simple health check – for GET /
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "API server is running" });
});

// Main endpoint your GPT will call
app.post("/render/capcut", async (req, res) => {
  const { template_id, script, scenes, captions, aspect_ratio } = req.body;

  console.log("Received render request:", {
    template_id,
    script,
    scenes,
    captions,
    aspect_ratio
  });

  // For now, just return fake URLs so everything works end-to-end
  const fakeId = Date.now();

  res.json({
    video_url: `https://example.com/videos/render-${fakeId}.mp4`,
    thumbnail_url: `https://example.com/thumbnails/render-${fakeId}.jpg`
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API server running on port ${PORT}`));
