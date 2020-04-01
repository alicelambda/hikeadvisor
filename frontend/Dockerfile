FROM node:11 as react-build

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

COPY . ./

RUN npm install

RUN npm upgrade

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]