FROM node:20.14.0

WORKDIR /app

COPY package*.json ./

RUN npm install --production 

COPY . .

CMD ["node", "src/index.js"]
