FROM node:18-buster

WORKDIR /app

RUN apt-get update && apt-get install -y python3 python3-pip ffmpeg

RUN pip3 install --no-cache-dir yt-dlp

COPY package.json package.json
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
