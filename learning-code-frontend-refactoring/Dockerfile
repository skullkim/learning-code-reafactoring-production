FROM node:alpine
RUN yarn global add serve 
WORKDIR /app
RUN mkdir ./build
COPY ./build ./build
CMD ["serve", "-l", "3000", "-s", "build"]
