FROM nginx

MAINTAINER Long Do "longhoangdo16@gmail.com"

EXPOSE 80

RUN mkdir -p /var/www/hikeadvisor.me
COPY ./build /var/www/hikeadvisor.me 
COPY nginx.conf /etc/nginx/nginx.conf


