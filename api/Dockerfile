# Note: 11.14 has full support for ES2018: https://node.green/
FROM    node:11.14-stretch-slim as build
WORKDIR /app
COPY    package*.json ./
RUN     npm ci
COPY    . .
RUN     npm run build

FROM    node:11.14-stretch-slim as runtime
WORKDIR /app
COPY    --from=build /app/build .
# Todo: Use webpack to shrink
COPY    --from=build /app/node_modules ./node_modules
CMD     ["node", "index.js"]
