FROM node:18-alpine

EXPOSE 3000

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./

COPY . .

CMD ["npm", "run", "start:dev"]
