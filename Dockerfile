FROM node:14-alpine

WORKDIR /assembleia-frontend

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]