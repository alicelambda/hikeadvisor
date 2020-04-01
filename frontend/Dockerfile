FROM nginx

MAINTAINER Long Do "longhoangdo16@gmail.com"


RUN mkdir -p /var/www/hikeadvisor.me
COPY ./build /var/www/hikeadvisor.me 
COPY nginx.conf /etc/nginx.conf


CMD ["nging-debug","-g","daemon off"]
