require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

// simple health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'API server is running' });
});

// POST /render/capcut – this is what the GPT Action will call
app.post('/render/capcut', (req, res) => {
  try {
    // 🔐 Check internal API key from Authorization header
    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace('Bearer ', '').trim();

    if (!token || token !== process.env.INTERNAL_API_KEY) {
      return res.status(401).json({ error: 'Unauthorized: invalid internal API key' });
    }

    // Read the payload the GPT sends (matches the schema from the old chat)
    const {
      template_id,
      script,
      scenes,
      captions,
      aspect_ratio,
      duration,
      audio_style,
      product_images,
      pacing
    } = req.body;

    console.log('Incoming render request:', {
      template_id,
      aspect_ratio,
      duration,
      pacing
    });

    // TODO: here you would actually call the real CapCut API.
    // For now we fake a render id so GPT has a realistic URL to use.
    const fakeId = Date.now();

    const videoUrl = `https://example.com/videos/render-${fakeId}.mp4`;
    const thumbnailUrl = `https://example.com/thumbnails/render-${fakeId}.jpg`;

    return res.json({
      video_url: videoUrl,
      thumbnail_url: thumbnailUrl,
      status: 'ok',
      message: 'Your CapCut-style video has been rendered (mock response).'
    });
  } catch (err) {
    console.error('Error in /render/capcut:', err);
    return res.status(500).json({ error: 'Video render failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API server running on port ${PORT}`));
