FROM node:10-alpine

WORKDIR /main
COPY ./back_end/loginserver.js /main
COPY ./back_end/package.json /main
COPY ./back_end/package-lock.json /main
RUN mkdir /main/uploads

RUN npm install

EXPOSE 5060

CMD ["node", "loginserver.js"]