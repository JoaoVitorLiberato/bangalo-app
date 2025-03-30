FROM node:23-alpine AS builder-app
WORKDIR /usr/src/app
COPY package*.json /usr/src/app
RUN npm ci --silent --production
COPY . .
CMD [ "npm", "run", "build" ]

FROM node:23-alpine
WORKDIR /usr/src/app
COPY --from=builder-app package*.json /usr/src/app
COPY --from=builder-app /usr/src/app/dist  /usr/src/app/dist
COPY --from=builder-app /usr/src/app/node_modules  /usr/src/app/node_modules
EXPOSE 3000
CMD [ "npm", "run", "serve" ]