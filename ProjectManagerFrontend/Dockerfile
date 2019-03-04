# Stage 1
FROM node:11 as node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod

# Stage 2
FROM nginx:alpine

COPY --from=node /usr/src/app/dist/ProjectManagerFrontend /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80