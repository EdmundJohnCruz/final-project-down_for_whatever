FROM node:10-alpine

WORKDIR /main
COPY ./back_end/kafka/* /main
COPY ./back_end/package.json /main
COPY ./back_end/package-lock.json /main

RUN npm install

# EXPOSE 5050 ???

CMD ["node", "kafkaworker.js"]