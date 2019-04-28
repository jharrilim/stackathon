FROM    node:10.15-stretch-slim as build
WORKDIR /app
COPY    package*.json ./
RUN     npm ci
COPY    . .
RUN     npm run build

FROM    nginx as runtime
COPY    --from=build /app/build /usr/share/nginx/html
COPY    nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE  80
