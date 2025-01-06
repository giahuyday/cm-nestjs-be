FROM node:18.1-alpine

ENV PORT 3000

COPY . /home/app

WORKDIR /home/app

RUN npm install

EXPOSE 3000

CMD ["sh", "-c", "npm run migration:run && npm start"]