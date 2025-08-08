import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.get("/live", (req, res) => {
  const videoId = req.query.video_id;
  if (!videoId) {
    return res.status(400).send("Missing video_id parameter");
  }

  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
  res.redirect(youtubeUrl);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
