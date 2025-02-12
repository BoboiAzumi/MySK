FROM node:22.13.1-alpine3.20

WORKDIR /app

COPY .env.docker /app/.env
COPY . .

RUN npm install
RUN npx prisma generate
RUN npx prisma migrate deploy
RUN npm run build
RUN npm run setup-admin
RUN mkdir /app/public/files && mkdir /app/public/img
COPY ./public /app/public

EXPOSE 3000

CMD ["npm", "run", "start"]