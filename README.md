## 项目简介

### 项目概述

本项目使用vue3.2+vite2+element plus组合开发的博客系统admin管理后台,与Django的admin结合使用，此处只添加主页、图片裁剪、目录编排三个页面，作为Django自带admin功能补充。vue与Django
admin结合使用参考[Django SimpleUI与vue的完美结合](https://www.cuiliangblog.cn/detail/article/40)。项目详细介绍可访问[崔亮的博客关于页](https://www.cuiliangblog.cn/about)

### 关联项目

* 博客网站后端

  [gitee](https://gitee.com/cuiliang0302/myblog_api)

  [github](https://github.com/cuiliang0302/myblog_api)

* 博客网站桌面端前端

  [gitee](https://gitee.com/cuiliang0302/myblog_pc)

  [github](https://github.com/cuiliang0302/myblog_pc)

* 博客网站移动端前端

  [gitee](https://gitee.com/cuiliang0302/myblog_mobile)

  [github](https://github.com/cuiliang0302/myblog_mobile)

* 博客网站管理员后台

  [gitee](https://gitee.com/cuiliang0302/myblog_admin)

  [github](https://github.com/cuiliang0302/myblog_admin)

## 项目部署

### 安装依赖

```
npm install
```

### 开发模式

```
npm run dev
```

### 项目打包

```
npm run build
```

## 注意事项

### 使用步骤
1. 打包vue项目

`npm run build`

2. 更新Django静态资源文件

```bash
rm -rf static/dist
mv /opt/WebstormProjects/myblog-admin-new/dist /opt/PycharmProjects/MyblogApi/static
```

3. git记得添加dist目录