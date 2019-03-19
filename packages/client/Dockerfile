FROM nginx:1.15
WORKDIR /usr/share/
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY /packages/client/build /usr/share/nginx/html
COPY /packages/client/nginx.conf /etc/nginx/conf.d/default.conf

