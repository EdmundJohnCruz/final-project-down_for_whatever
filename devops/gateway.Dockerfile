FROM node:10-alpine

WORKDIR /main
COPY ./backend/gateway.js /main
COPY ./backend/package.json /main
COPY ./backend/package-lock.json /main

RUN npm install

EXPOSE 4000

CMD ["node", "gateway.js"]