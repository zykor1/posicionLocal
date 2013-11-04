#bash -e install_nginx.sh | tee install_nginx.log

# Set environment variables
APPNAME=nginx_posicionLocal      # Name of the uWSGI Custom Application
PYTHON=python2.7           # Django python version
DJANGOPROJECT=ct2    # Django project name

mkdir -p /home/nginx/$APPNAME/{bin,nginx,src,tmp}

###########################################################
# nginx 1.2.3
# original: http://nginx.org/download/nginx-1.5.6.tar.gz
###########################################################
cd /home/nginx/$APPNAME/src
wget 'http://nginx.org/download/nginx-1.5.6.tar.gz'
tar -xzf nginx-1.5.6.tar.gz
cd nginx-1.5.6
./configure \
  --prefix=/home/nginx/$APPNAME/nginx \
  --sbin-path=/home/nginx/$APPNAME/nginx/sbin/nginx \
  --conf-path=/home/nginx/$APPNAME/nginx/nginx.conf \
  --error-log-path=/home/nginx/$APPNAME/nginx/log/nginx/error.log \
  --pid-path=/home/nginx/$APPNAME/nginx/run/nginx/nginx.pid  \
  --lock-path=/home/nginx/$APPNAME/nginx/lock/nginx.lock \
  --with-http_flv_module \
  --with-http_gzip_static_module \
  --http-log-path=/home/nginx/$APPNAME/nginx/log/nginx/access.log \
  --http-client-body-temp-path=/home/nginx/$APPNAME/nginx/tmp/nginx/client/ \
  --http-proxy-temp-path=/home/nginx/$APPNAME/nginx/tmp/nginx/proxy/ \
  --http-fastcgi-temp-path=/home/nginx/$APPNAME/nginx/tmp/nginx/fcgi/
make && make install

# Creamos los archivos de arranque de nginx

ln -s /home/nginx/$APPNAME/nginx/sbin/nginx /home/nginx/$APPNAME/bin

mkdir -p /home/nginx/$APPNAME/nginx/tmp/nginx/client

cat << EOF > /home/nginx/$APPNAME/nginx/nginx.conf
worker_processes  2;

events {
    worker_connections  1024;
}

http {
    include            mime.types;
    default_type       application/octet-stream;
    sendfile           on;
    keepalive_timeout  65;
    server_tokens      off;
    access_log  /home/logs/${APPNAME}/access_${APPNAME}.log combined;
    error_log   /home/logs/${APPNAME}/error_${APPNAME}.log  crit;

    gzip on;
    gzip_comp_level 2;
    gzip_proxied any;
    gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_buffers 16 8k;
    gzip_vary on;

    upstream node {
      server 127.0.0.1:4001;
    }

server {

        listen       4000;
        server_name  posicionlocal.com;
        root /home/nodejs/posicionlocal;

        location ~* ^.+\.ico$ {
          access_log        off;
          expires           7d;
        }

        location ~* ^.+\.(jpg|jpeg|gif|png|css|js|mp3)$ {
          access_log        off;
          expires           3h;
        }

        try_files $uri @node;

        location @node {
          proxy_set_header  X-Real-IP        $remote_addr;
          proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
          proxy_set_header  Host             $http_host;
          proxy_redirect    off;
          proxy_pass        http://node;
        }
    }
}
EOF


