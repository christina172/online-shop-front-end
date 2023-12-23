FROM node:20.10.0
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm i
EXPOSE 3000

CMD ["npm", "run", "start"]