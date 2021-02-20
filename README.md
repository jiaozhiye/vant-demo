## 说明

- DMS 管理系统，基于 Vue 的前端集成解决方案。

## 前序准备

- 本地安装 nodejs 请使用 v12.16.0 及以上版本，建议使用 nvm 管理。
- 建议使用 yarn 管理 npm 依赖。
- 编译器统一使用 VScode，必要的插件列表：
  - Vetur
  - Prettier
  - EditorConfig
  - ESLint

## 安装

### 使用 yarn 或 npm 安装

```bash
# 安装依赖
$ yarn install 或 npm install

# 启动本地服务
$ npm run start 或 npm run dev

# 发布，构建生产环境代码
$ npm run build
```

## 微前端拆分，允许修改的公共文件

```
1. framework - 架构
2. system - 系统

注意：npm 依赖需要统一管理，不允许私自安装；公共的表单校验规则统一管理
```

### 自定义主题

修改 build/utils.js 第 100 行代码，主题定义方式，参考 https://youzan.github.io/vant/#/zh-CN/theme

## 目录结构

```
├── build                      # webpack 构建相关
├── config                     # webpack 参数配置
├── static                     # 资源文件
├── public                     # 公共资源
│   ├── index.html             # 所有请求
│   ├── favicon.ico            # favicon 图标
├── src                        # 源代码
│   ├── api                    # 所有请求
│   ├── assets                 # 静态资源
│   ├── charts                 # 图表组件
│   ├── components             # 全局公用组件
│   ├── config                 # 全局配置
│   ├── directive              # 全局指令
│   ├── filters                # 全局 filter
│   ├── lang                   # 多语言支持
│   ├── layout                 # 全局 layout
│   ├── mixins                 # 全局混入
│   ├── mock                   # 项目 mock 模拟数据
│   ├── modules                # 微前端模块
│   ├── pages                  # 非业务页面
│   ├── routes                 # 路由
│   ├── store                  # 全局 store 管理
│   ├── utils                  # 全局公用方法
│   ├── app.js                 # 根组件
│   └── main.js                # 入口文件
├── .babelrc                   # babel-loader 配置
├── .editorconfig              # EditorConfig 配置
├── .env                       # 开发环境环境常量
├── .eslintignore              # Eslint 忽略清单
├── .eslintrc.js               # Eslint 校验规则
├── .gitignore                 # git 忽略清单
├── .npmrc                     # npm 配置
├── .postcssrc.js              # postcss 配置
├── .prettierrc                # Prettier 配置
├── README.md                  # README.md
└── package.json               # package.json
```

欢迎访问个人 [github](https://github.com/jiaozhiye) 主页.
