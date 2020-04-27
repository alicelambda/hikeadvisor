# base image
FROM node:12.2.0-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

COPY . ./

RUN npm install
RUN npm update
RUN npm install d3
RUN npm install react-scripts@3.4.0

EXPOSE 3000

# start app
CMD ["npm", "run", "start"]
