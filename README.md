## 关于项目配置
>项目早期，只是简单的配置项，后面会优化和补充

编辑 `public/config` 下的 `config.js` 文件

```js
exports.app = {
  // 启动端口
  port: 8081,
  // API URL
  api: 'http://127.0.0.1:16669/api/admin',
}
```
## 关于项目搭建

```vue
# 安装依赖
npm i

# 启动运行环境
npm run serve

# 编译
npm run build
```
