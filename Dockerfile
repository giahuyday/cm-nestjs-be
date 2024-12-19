FROM node:18.1-alpine

ENV PORT 3000

COPY . /home/app

WORKDIR /home/app

RUN npm install

EXPOSE 3000

# Start the server using the production build
CMD [ "npm", "start" ]