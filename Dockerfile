# 使用官方 Nginx 镜像
FROM nginx:alpine

# 删除默认的 nginx 配置
RUN rm /etc/nginx/conf.d/default.conf

# 复制自定义配置文件
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 复制构建后的前端资源
COPY build/ /usr/share/nginx/html/

# 暴露端口
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
