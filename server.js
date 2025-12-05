import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

app.post("/render/capcut", async (req, res) => {
  const { template_id, script, scenes, captions, aspect_ratio } = req.body;

  try {
    // Example placeholder call — replace with real CapCut/video engine API later
    const response = await axios.post(
      "https://api.capcut.com/render",
      {
        template_id,
        script,
        scenes,
        captions,
        aspect_ratio
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CAPCUT_API_KEY}`
        }
      }
    );

    res.json({
      video_url: response.data.video_url,
      thumbnail_url: response.data.thumbnail_url
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("API server running on port 3000"));
