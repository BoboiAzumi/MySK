FROM node:22.14.0-alpine3.20

WORKDIR /app

COPY .env.docker /app/.env
COPY . .

RUN npm install
RUN npx prisma generate
RUN npx prisma migrate deploy
RUN npm run build
RUN npm run setup-admin

COPY ./public/img/person.png /app/public/img

EXPOSE 3000

CMD ["npm", "run", "start"]