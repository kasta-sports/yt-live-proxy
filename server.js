const express = require("express");
const { exec } = require("child_process");

const app = express();
const port = process.env.PORT || 3000;

app.get("/live", (req, res) => {
  const videoId = req.query.video_id;
  if (!videoId) {
    return res.status(400).send("Missing video_id parameter");
  }

  // Використовуємо yt-dlp щоб отримати url m3u8
  const cmd = `yt-dlp -g "https://www.youtube.com/watch?v=${videoId}" --hls-prefer-native`;

  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`yt-dlp error: ${error.message}`);
      return res.status(500).send("Error fetching stream URL");
    }
    if (stderr) {
      console.error(`yt-dlp stderr: ${stderr}`);
    }

    const urls = stdout.trim().split('\n');
    const m3u8url = urls[0]; // перший url зазвичай m3u8

    if (!m3u8url) {
      return res.status(404).send("Stream URL not found");
    }

    // Редіректим на прямий m3u8 потік
    res.redirect(m3u8url);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
