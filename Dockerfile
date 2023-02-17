FROM node:18-alpine

EXPOSE 3000

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm i

COPY . .

CMD ["npm", "run", "start:dev"]
