FROM nginx:alpine


RUN rm /etc/nginx/conf.d/*
COPY frontend.nginx.conf /etc/nginx/conf.d/
COPY backend.nginx.conf /etc/nginx/conf.d/
EXPOSE 80


CMD [ "nginx", "-g", "daemon off;" ]