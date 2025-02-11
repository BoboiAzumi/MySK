FROM nginx:stable-alpine

COPY . /etc/nginx/conf.d

EXPOSE 3000

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]