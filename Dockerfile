FROM node:22.12.0 AS build
COPY . /opt/vue
WORKDIR /opt/vue
RUN sed -i 's/config.headers/\/\/&/' src/api/request.js
RUN npm install --registry https://registry.npm.taobao.org && npm run build

FROM nginx:1.25
COPY --from=build /opt/vue/dist /opt/vue/dist
COPY nginx.conf /etc/nginx/conf.d/nginx.conf
CMD ["nginx", "-g","daemon off;"]
