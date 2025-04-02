FROM node:23

WORKDIR /app

COPY package.json .
RUN npm i

COPY . .

EXPOSE 4173

CMD ["npm", "run", "dev"]