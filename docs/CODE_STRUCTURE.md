# 个人主页代码结构说明

本文档基于当前仓库 `AnXMuy.github.io` 的实际代码整理，目标是帮助你快速定位“改哪里会影响哪里”。

## 1. 项目类型与运行方式

这是一个 **Jekyll 静态站点**（GitHub Pages 体系），不是 React/Vue 前端工程。

- 依赖入口：`Gemfile`
- 本地启动命令：`run_server.sh`（内容是 `bundle exec jekyll liveserve`）
- 全局配置：`_config.yml`

构建时，Jekyll 会读取 `_config.yml` 和页面/模板文件，生成最终静态 HTML/CSS/JS。

## 2. 目录总览（按职责）

```text
AnXMuy.github.io/
├── _config.yml                    # 站点总配置（标题、作者、插件、构建规则）
├── _pages/
│   └── about.md                   # 主页主内容（你的 About / News / Publications 等）
├── _layouts/
│   └── default.html               # 页面骨架布局（head、导航、侧边栏、正文、脚本）
├── _includes/                     # 可复用模板片段
│   ├── head.html                  # <head> 里 meta、CSS、SEO 引入
│   ├── masthead.html              # 顶部导航栏
│   ├── sidebar.html               # 左侧栏容器
│   ├── author-profile.html        # 侧栏作者信息与社交链接
│   ├── scripts.html               # JS 入口 + analytics + scholar 数据注入
│   └── fetch_google_scholar_stats.html  # 拉取引用统计并填充页面
├── _data/
│   └── navigation.yml             # 顶部导航菜单项（锚点链接）
├── _sass/                         # SCSS 分模块样式与第三方样式源码
├── assets/
│   ├── css/main.scss              # SCSS 总入口（编译成 main.css）
│   ├── js/main.min.js             # 线上使用的压缩脚本
│   ├── js/_main.js                # 未压缩主脚本源码
│   └── fonts/                     # Font Awesome / Academicons 字体
├── images/                        # 图片、favicon、PDF 简历等静态资源
├── google_scholar_crawler/
│   ├── main.py                    # 抓取 Google Scholar 数据并产出 JSON
│   └── requirements.txt           # 爬虫依赖
├── docs/
│   ├── README-zh.md               # 模板原中文说明
│   └── screenshot.png             # 模板示意图
├── README.md                      # 模板主说明
└── run_server.sh                  # 本地开发启动脚本
```

## 3. 页面渲染链路（从配置到最终页面）

访问首页 `/` 时，主要链路如下：

1. `/_pages/about.md`
- Front Matter 中定义 `permalink: /`，因此它是首页。
- 主体内容（Markdown + 少量 HTML/JS）写在这个文件。

2. `/_layouts/default.html`
- `about.md` 使用默认布局（由 `_config.yml` 的 `defaults` 设置）。
- 布局决定页面框架：`head`、`masthead`、`sidebar`、正文 `{{ content }}`、脚本。

3. `/_includes/*.html`
- `head.html`：加载 SEO、viewport、`/assets/css/main.css`。
- `masthead.html`：读取 `_data/navigation.yml` 生成顶部导航。
- `sidebar.html` + `author-profile.html`：读取 `site.author` 渲染头像、简介、链接。
- `scripts.html`：加载 `assets/js/main.min.js` 和统计脚本。

4. 样式与脚本
- `assets/css/main.scss` 导入 `_sass/` 模块并编译成 `main.css`。
- `assets/js/main.min.js` 提供平滑滚动、sticky sidebar、图片弹窗等交互。
- `about.md` 里还内联了“点击复制邮箱”的局部脚本与样式。

## 4. 关键配置文件说明

### 4.1 `_config.yml`

这个文件控制全站行为，重点字段：

- 站点信息：`title`、`description`、`repository`
- 作者信息：`author` 下的 `name/avatar/bio/email/github/googlescholar/orcid...`
- 构建规则：`include`、`exclude`、`defaults`、`sass`、`permalink`
- 时区：`timezone: Asia/Shanghai`
- 插件：`jekyll-sitemap`、`jekyll-feed` 等
- 引用统计：`google_scholar_stats_use_cdn`

注意：修改 `_config.yml` 后通常需要重启 `jekyll liveserve`。

### 4.2 `_data/navigation.yml`

定义顶部菜单，如 `About Me`、`News`、`Publications` 等。

- 每项是 `title + url`
- 当前写法是锚点链接（例如 `/#-news`）
- 对应的标题锚点由 Markdown 标题自动生成（或手动 `<span class='anchor' id='...'>`）

### 4.3 `_pages/about.md`

这是你主页内容的核心文件，当前包括：

- About Me
- News
- Publications
- Honors and Awards
- Competitions
- Educations
- Internships

同时这个文件里还有：

- Scholar 数据地址拼接的 Liquid 变量
- 自定义 `.copy-email-text` 样式
- 点击复制邮箱的内联 JavaScript

## 5. Scholar 引用统计相关结构

仓库保留了“自动更新 Google Scholar 引用”的完整链路：

1. 数据抓取脚本：`google_scholar_crawler/main.py`
- 读取环境变量 `GOOGLE_SCHOLAR_ID`
- 使用 `scholarly` 拉取作者与 publication 信息
- 输出：
  - `results/gs_data.json`
  - `results/gs_data_shieldsio.json`

2. 前端注入：`_includes/fetch_google_scholar_stats.html`
- 页面加载后通过 jQuery `getJSON` 拉取 `gs_data.json`
- 将总引用填到 `id='total_cit'`
- 将论文引用数填到 `.show_paper_citations` 元素

3. 数据来源地址由 `_config.yml` 的 `repository` 和 `google_scholar_stats_use_cdn` 共同决定。

## 6. 样式与脚本组织

### 6.1 CSS/SCSS

- `assets/css/main.scss` 是总入口。
- 它先导入主题与第三方模块（breakpoint/susy/font-awesome 等），再定义你自己的样式。
- 当前你自定义了：
  - `.paper-box`（论文图文块响应式布局）
  - `.badge`（论文年份标签）
  - 锚点偏移（避免固定导航遮挡标题）

### 6.2 JavaScript

- `assets/js/_main.js`：未压缩源码，包含主题交互逻辑。
- `assets/js/main.min.js`：实际页面引入版本。
- `_includes/scripts.html` 只引入 `main.min.js`，所以如果你只改 `_main.js` 而不重新压缩，线上行为不会变。

## 7. 你最常改动的文件（实用定位）

如果你的目标是日常维护主页，优先看这些：

1. 改个人信息：`_config.yml` 的 `author` 与站点字段
2. 改主页内容：`_pages/about.md`
3. 改顶部导航：`_data/navigation.yml`
4. 改侧栏展示：`_includes/author-profile.html`
5. 改页面样式：`assets/css/main.scss`
6. 改交互逻辑：`assets/js/main.min.js`（或先改 `_main.js` 再自行构建 min 版本）
7. 改资源文件：`images/`（头像、项目图、CV 等）

## 8. 当前代码中的几个注意点

1. `head.html` 内部又包含了一个 `<head>` 标签和 `<base target="_blank">`。这会让页面所有链接默认新开标签页，且 HTML 结构不够规范。
2. 导航锚点（如 `/#-news`）依赖标题自动生成的 `id`，如果你改标题文字，锚点可能失效。
3. `about.md` 内联了 CSS/JS，功能上没问题，但后续内容变大时建议拆到独立文件，维护性更高。
4. Scholar 统计需要远端 JSON 可访问；若对应分支/文件不存在，页面相关位置会是空值。

## 9. 一句话理解这个项目

这是一个“**以 `_pages/about.md` 为内容中心、`_layouts + _includes` 为模板骨架、`_config.yml` 为全局配置**”的 Jekyll 学术主页项目。

