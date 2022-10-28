FROM node:14.17
RUN mkdir -p /user/src/app
WORKDIR /user/src/app
COPY . /user/src/app

RUN yarn install
RUN yarn build
EXPOSE 5000
CMD ["yarn","start:prod"]