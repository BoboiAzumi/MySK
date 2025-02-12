FROM node:22.13.1-alpine3.20

WORKDIR /app

COPY .env.docker /app/.env
COPY . .

RUN npm install
RUN npx prisma migrate deploy
RUN npm run build
RUN npm run setup-admin

EXPOSE 3000

CMD ["npm", "run", "start"]