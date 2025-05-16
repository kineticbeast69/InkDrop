FROM node:23-alpine
WORKDIR /app
COPY package.json package-lock.json .
RUN npm install
COPY . .
EXPOSE 4001
CMD ["npm","start"]