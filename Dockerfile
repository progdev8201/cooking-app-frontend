#stage 1
FROM node:latest as node
ARG environement

ENV environement $environement
WORKDIR /app
COPY . .
RUN npm install
RUN ng build --configuration=${environement}

#stage 2
FROM nginx:1.16.0-alpine
COPY --from=node /app/dist/whatAreWeCooking-app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=node /app/dist/whatAreWeCooking-app /etc/nginx/conf.d
CMD ["nginx","-g","daemon off;"]
EXPOSE 3000