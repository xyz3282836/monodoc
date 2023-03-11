# Nginx 配置

```
user www-data;
worker_processes 36;
worker_cpu_affinity 0010000000000000000000000000000000000000 0001000000000000000000000000000000000000 0000100000000000000000000000000000000000 0000010000000000000000000000000000000000 0000001000000000000000000000000000000000 0000000100000000000000000000000000000000 0000000010000000000000000000000000000000 0000000001000000000000000000000000000000 0000000000100000000000000000000000000000 0000000000010000000000000000000000000000 0000000000001000000000000000000000000000 0000000000000100000000000000000000000000 0000000000000010000000000000000000000000 0000000000000001000000000000000000000000 0000000000000000100000000000000000000000 0000000000000000010000000000000000000000 0000000000000000001000000000000000000000 0000000000000000000100000000000000000000 0000000000000000000010000000000000000000 0000000000000000000001000000000000000000 0000000000000000000000100000000000000000 0000000000000000000000010000000000000000 0000000000000000000000001000000000000000 0000000000000000000000000100000000000000 0000000000000000000000000010000000000000 0000000000000000000000000001000000000000 0000000000000000000000000000100000000000 0000000000000000000000000000010000000000 0000000000000000000000000000001000000000 0000000000000000000000000000000100000000 0000000000000000000000000000000010000000 0000000000000000000000000000000001000000 0000000000000000000000000000000000100000 0000000000000000000000000000000000010000 0000000000000000000000000000000000001000 0000000000000000000000000000000000000100;

error_log /data/log/nginx/error-logger error;
pid /var/run/nginx.pid;

worker_rlimit_nofile 262144;

load_module /etc/nginx/modules/or_http_t1k_core_module.so;

events {
 worker_connections 131072;
 use epoll;
 accept_mutex on;
 multi_accept on;
}


http {

 lua_package_path "/etc/nginx/lua/openresty/utils/lua-resty-balancer/lib/?.lua;/etc/nginx/lua/openresty/utils/lua-resty-http/lib/?.lua;/etc/nginx/lua/openresty/utils/lua-cjson/lua/?.lua;/etc/nginx/lua/openresty/utils/lua-resty-consul/lib/?.lua;/etc/nginx/lua/openresty/utils/lua-resty-upstream-healthcheck/lib/?.lua;/etc/nginx/lua/openresty/core/?.lua;/etc/nginx/lua/openresty/?.lua;;";

 lua_max_pending_timers 10240;
 lua_max_running_timers 10240;

 lua_shared_dict shd_upstream 60m;
 lua_shared_dict shd_index 30m;
 lua_shared_dict shd_healthcheck 30m;
 lua_shared_dict flood_protect 64m;

 lua_socket_log_errors off;

 log_not_found off;
 sendfile on;

 ##
 # Basic Settings
 ##

 include /etc/nginx/mime.types;
 default_type application/octet-stream;

 # double size of page (get : getconf PAGESIZE)
 client_max_body_size 12m;
 client_header_buffer_size 128k;
 #open_file_cache max=150000 inactive=20s;
 #open_file_cache_valid 2s;
 #open_file_cache_min_uses 1;
 large_client_header_buffers 4 256k;

 client_body_buffer_size 8k; #Double to PAGESIZE
 proxy_connect_timeout 500ms; #nginx跟后端服务器连接超时时间(代理连接超时)
 proxy_send_timeout 3s; #后端服务器数据回传时间(代理发送超时)
 proxy_read_timeout 3s; #连接成功后，后端服务器响应时间(代理接收超时)

 proxy_buffering on; #Close for high speed response
 proxy_buffer_size 32k; #代理请求缓存区_这个缓存区间会保存用户的头信息以供Nginx进行规则处理_一般只要能保存下头信息即可
 proxy_buffers 4 32k; #proxy_buffers缓冲区 默认情况也为分页大小，根据操作系统的不同可能是4k或者8k。
 proxy_busy_buffers_size 64k; #高负荷下缓冲大小（proxy_buffers*2）

 proxy_temp_file_write_size 100M; #设定缓存文件夹大小，大于这个值，将从upstream服务器传递请求，而不缓冲到磁盘
 proxy_ignore_client_abort on; #不允许代理端主动关闭连接

 proxy_intercept_errors on; #使nginx阻止HTTP应答代码为400或者更高的应答。
 proxy_cache_use_stale error timeout invalid_header updating http_500 http_502 http_503 http_504; #When updating or error use cache
 proxy_pass_header Server; #server direct return
 proxy_hide_header X-Debug; #Ignore proxy server data
 proxy_hide_header X-Via; #Ignore proxy server data
 #proxy_hide_header Bili-Status-Code;
 proxy_next_upstream_tries 2;
 proxy_next_upstream error timeout invalid_header non_idempotent;
 recursive_error_pages on;

 fastcgi_connect_timeout 300ms;
 fastcgi_send_timeout 1s;
 fastcgi_read_timeout 1s;
 #first response buffer size
 fastcgi_buffer_size 256K;
 #continue response buffer size
 fastcgi_buffers 32 256K;
 #busy buffer
 fastcgi_busy_buffers_size 2048k;
 fastcgi_temp_file_write_size 2048k;

 #tcp_nopush: Sends the HTTP response headers in one packet.
 tcp_nopush on;

 #keepalive_timeout 0;
 keepalive_timeout 5;
 # make it small for hard load server

 #tcp_nodelay: Disables the Nagle buffering algorithm. Well, that cleared that one up!
 # General web use does require a response from the client , tune it to off
 tcp_nodelay on;

 types_hash_max_size 2048;

 server_names_hash_bucket_size 256;

 server_tokens off;

 ##
 # Gzip Settings
 ##
 gzip off;
 gzip_disable msie6;

 #turn on proxy GZIP
 gzip_proxied any;

 gzip_vary off;
 # gzip_proxied any;
 # gzip_comp_level 6;
 gzip_buffers 16 8k;
 gzip_http_version 1.0;
 gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;


 proxy_temp_path /dev/shm/proxy_temp;
 fastcgi_temp_path /dev/shm/fastcgi_temp;
 client_body_temp_path /dev/shm/client_temp;
 index index.htm index.html index.php;

 include /etc/nginx/conf.d/*.conf;
 include /etc/nginx/sites-enabled/*;

 ##
 # Logging Settings
 ##

 #access_log /dev/shm/logger logger;
 access_log /data/log/nginx/logger logger;

}
Process finished with exit code 0

```
