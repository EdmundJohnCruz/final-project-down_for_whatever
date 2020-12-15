FROM node:10-alpine

WORKDIR /main
COPY ./back_end/inquiryserver.js /main
COPY ./back_end/package.json /main
COPY ./back_end/package-lock.json /main

RUN npm install

EXPOSE 5050

CMD ["node", "inquiryserver.js"]