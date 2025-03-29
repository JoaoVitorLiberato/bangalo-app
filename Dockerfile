FROM node:23-alpine as builder
WORKDIR /usr/src/app
COPY package*.json /usr/src/app
RUN npm ci --silent --production
COPY . .
CMD [ "npm", "run", "build" ]

FROM node:23-alpine
WORKDIR /usr/src/app
COPY --from=builder package*.json /usr/src/app
COPY --from=builder /usr/src/app/dist  /usr/src/app/dist
COPY --from=builder /usr/src/app/node_modules  /usr/src/app/node_modules
RUN export DATABASE_URL=postgresql://jo_o:gRXFWxcrs7OyqIa8IrOuhw@bangalo-9558.j77.aws-us-east-1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full
EXPOSE 3000
CMD [ "npm", "run", "serve" ]