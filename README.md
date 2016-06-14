# 说明

这个 repo 是 [webpack-deploy-markdown-site](https://github.com/bammoo/webpack-deploy-markdown-site) 的服务器端脚本

## 使用步骤

在服务器上建一个目录放
 
 - deploy-hash-server.js
 - tpl.html

修改 tpl.html 和 deploy-hash-server.js 里面的 `__CDN_URL__`, `__PATH_OF_INDEX_HTML__` 配置

启动服务 `node deploy-hash-server.js`，会监听 8080 端口。更多信息请看 [webpack-deploy-markdown-site](https://github.com/bammoo/webpack-deploy-markdown-site)