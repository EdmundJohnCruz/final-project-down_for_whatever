FROM node:10-alpine

WORKDIR /main
COPY ./back_end/websocketserver.js /main
COPY ./back_end/package.json /main
COPY ./back_end/package-lock.json /main

RUN npm install

EXPOSE 6000

CMD ["node", "websocketserver.js"]