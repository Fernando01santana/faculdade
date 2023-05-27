FROM --platform=linux/arm64 node:lts-alpine

WORKDIR /fernando/src/app
COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build\
    chmod +x start.sh

EXPOSE 6363
CMD [ "node","build/main" ]
