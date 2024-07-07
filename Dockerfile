FROM node:20.14.0

WORKDIR /app
EXPOSE 3000
COPY package.json .

RUN npm install

COPY . .

ENV NODE_ENV=PROD
RUN npm start
ENTRYPOINT [ "npm", "start:prod" ] 


