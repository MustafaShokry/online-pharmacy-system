FROM node:lts-alpine3.21 AS base
WORKDIR /usr/src/app
COPY package*.json ./

FROM base AS development
RUN npm install -g nodemon
RUN npm install
COPY . .
EXPOSE 3000
CMD ["mkdir", "images"]
CMD ["nodemon", "index.js"]

FROM base AS production
RUN npm install
COPY . .
EXPOSE 3000
CMD ["mkdir", "images"]
CMD ["node", "index.js"]