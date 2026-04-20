FROM node:lts-alpine

WORKDIR /app

COPY package.json package-lock.json* /app/
RUN npm install
COPY . /app/
RUN npm run build

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["npm", "start"]