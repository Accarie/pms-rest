
FROM node:18

WORKDIR /app

COPY package.json ./

COPY yarn.lock ./

RUN npm ci

COPY . .

RUN yarn build

EXPOSE 3058

CMD ["yarn", "dev"]