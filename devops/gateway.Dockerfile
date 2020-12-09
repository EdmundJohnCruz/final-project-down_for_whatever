FROM node:10-alpine

WORKDIR /main
COPY ./back_end/gateway.js /main
COPY ./back_end/package.json /main
COPY ./back_end/package-lock.json /main

RUN npm install

EXPOSE 4000

CMD ["node", "gateway.js"]