FROM node:18-alpine

WORKDIR /app

# Встановлюємо yt-dlp
RUN apk add --no-cache python3 py3-pip ffmpeg && \
    pip3 install --no-cache-dir yt-dlp

COPY package.json package.json
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
