FROM node:10-alpine

WORKDIR /main
COPY ./front_end/public /main/public
COPY ./front_end/src /main/src
COPY ./front_end/package.json /main
COPY ./front_end/package-lock.json /main
COPY ./back_end/frontend.js /main/server/frontend.js

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["node", "server/frontend.js"]