FROM node:22.13.1-alpine3.20

WORKDIR /app

COPY . .
COPY /app/.env.docker /app/.env

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]