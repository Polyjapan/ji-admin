# Stage 1
FROM node:10-alpine as build-step

RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run prod

# Stage 2
FROM nginx:1.17.1-alpine
COPY --from=build-step /app/dist/ji-admin /usr/share/nginx/html
COPY ./docker/nginx_default.conf /etc/nginx/conf.d/default.conf
