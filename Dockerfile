FROM node:12.16.3
WORKDIR /usr/src/app
COPY . .
WORKDIR /usr/src/app
RUN npm install
RUN npm run build
EXPOSE 7003
CMD ["npm", "start"]
