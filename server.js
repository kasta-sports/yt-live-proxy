import express from "express";
import { exec } from "child_process";
import path from "path";
import fs from "fs";

const app = express();
const port = process.env.PORT || 3000;

app.get("/live", (req, res) => {
  const videoId = req.query.video_id;
  if (!videoId) {
    return res.status(400).send("Missing video_id parameter");
  }

  // Запускаємо yt-dlp, щоб отримати пряме посилання на m3u8
  const command = `yt-dlp -g "https://www.youtube.com/watch?v=${videoId}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`yt-dlp error: ${error.message}`);
      return res.status(500).send("Error fetching stream");
    }
    if (stderr) {
      console.error(`yt-dlp stderr: ${stderr}`);
    }

    const streamUrl = stdout.trim();

    // Перенаправляємо клієнта на реальний HLS потік
    res.redirect(streamUrl);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
