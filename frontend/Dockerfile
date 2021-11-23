FROM docker.io/node:12-bullseye-slim as build
RUN mkdir build
WORKDIR build

RUN npm install -g @angular/cli@latest
RUN npm install -g typescript && \
npm install -g ts-node


ARG API_URL
ENV API_URL=$API_URL
COPY . .
RUN npm update
RUN npm run build 

FROM docker.io/nginx:mainline
RUN apt update
RUN apt install bind9 -y
COPY --from=build /build/dist/frontend /var/www/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
