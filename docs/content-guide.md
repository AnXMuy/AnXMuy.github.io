# 主页内容维护 / Content guide

## 信息与展示分离

- `data/site.ts`：姓名、联系方式、照片、CV 和站外链接。
- `data/resume.ts`：教育、实习、竞赛与荣誉记录，也是现有简历生成流程的数据来源。修改记录前先核实事实。
- `data/publications.ts`：论文、作者顺序、年份、资源地址和研究分组。论文标题、作者、会议及评测数值保留原文。
- `data/translations.ts`：共享界面与说明文字的英中对照。键是英文原文；未提供译文时保留英文，不自动猜测专名。
- `app/blog/agenticasr/page.tsx`：项目文章正文；摘要在 `T` 的 `zh` 属性中提供人工翻译，原始英文摘要仍用于结构化数据。

## 语言行为

网站使用静态导出，不需要运行时服务器或翻译 API。首次访问统一默认英文，不跟随浏览器语言；顶部按钮可随时切换，并在本机保存偏好。导航、刷新后保持选择；存储被禁用时仍可在当前页面切换。文档 `lang` 随选择更新。

统一用语：研究方向为「多模态大模型与人机交互」；Young Gifted Program 中文为「西安交通大学少年班」；西交实习单位细分为「计算机学院 / School of Computer Science」，导师姓名保持不变；TCS 为「理论计算机科学 / Theoretical Computer Science」；机器人导航明确为课程项目。历史论文的研究内容、作者和题名不随个人简介改写。

静态 HTML 和搜索引擎元数据默认英文；无 JavaScript 时英文内容仍可阅读。当前不是独立 `/zh/`、`/en/` URL 方案，不声明不存在的 hreflang 页面。论文内的指标名、图中文字、作者姓名、BibTeX 及原始附件保留原文。

新增可翻译文本时使用 `<T>English text</T>`，在翻译表添加同名键；局部文本也可使用 `<T zh="中文">English</T>`。两种语言需要不同链接顺序时用 `Localized`，不要拆成不符合中文语序的短句。

### 仍保留英文、待本人确认的专名

- Outstanding Talent Program：暂不推断正式项目中文名称。
- Shuiyou：暂不推断奖学金冠名的汉字。
- 新闻中的其他合作者姓名：未获确认前保留罗马字写法。导师姓名已由本人确认：Xiangyong Cao 为曹相湧，Xie Chen 为陈谐，均为副教授、博士生导师；论文作者列表仍保留英文署名。陈谐个人主页使用本人提供的中文页地址。
- Honorable Prize：保留源记录奖项名称，不推断其正式等级译名。

## 发布一篇 Blog

1. 在 `app/blog/<slug>/page.tsx` 创建真实文章，并导出 `metadata`。使用 `PageIntro` 与 `T` 提供双语内容；`app/notes/tcs-review/page.tsx` 可作为简单资料文章的参考。
2. 在 `data/blog.ts` 添加 `BlogPost`：唯一 `slug`、实际 `href`、双语 `title` / `summary`、分类、标签。原有三条内容保持不变，新增的 AuK 开源记录链接到官方项目主页，不复制或迁移外部页面。
   `tags` 使用 `{ en, zh }` 对象数组，写具体内容主题，而不是 arXiv、PDF、GitHub 等发布平台或文件格式。标签显示随语言切换，搜索同时匹配中英文。
3. 分类按固定顺序展示：`research` 论文分享、`projects` Project、`documents` 文档资料、`notes` 随手记。不要为填满页面添加虚构文章；零篇分类会展示明确空状态。AgenticASR 归论文分享，机器人导航归 Project，TCS 复习资料归文档资料，AuK 开源记录归随手记；分类调整不改变文章 URL。非 GitHub 外链显示「访问项目主页」，不显示仓库星标。
4. `date` 只写确认的发布日期。外部项目没有已确认日期时留空；不要使用当前日期伪装发布时间。外链设 `external: true`；PDF 放在 `public/files/`，可用 `download` 暴露下载入口。
5. 首页精选默认使用目录第一条。其他条目按目录顺序显示。分类计数、双语搜索和内部文章 sitemap 自动读取该目录。
6. 运行 `npm run lint` 和 `npm run build`，确认 `out/blog/<slug>/index.html` 生成，再按已有 GitHub Pages 流程发布。

旧 `/notes/`、`/notes/tcs-review/`、`/blog/2026-05-27-test-post/` 地址继续保留，避免已有链接失效。

## 视觉与素材

- `app/globals.css` 是全站基础样式的唯一来源，统一浅海蓝配色、1120px 最大容器宽度、页头、页尾、中文字体与共用组件；`app/ocean.css` 仅管理 Blog 列表组件，避免重复覆盖基础样式。
- `app/blog/agenticasr/page.module.css` 只定义论文项目页布局，复用全站字体、配色和容器变量。不要再给项目页建立独立的深色主题。
- 英文统一使用 DM Sans；中文优先使用本机苹方、冬青黑体、微软雅黑，缺失时回退到本地托管的 Noto Sans SC。标题与正文采用同一字体体系，不再混用 Manrope 与 Inter。正文桌面 18–20px、手机 17–18px；新闻 16–17px、论文作者 15px，辅助标签 12–14px。字体由 Next.js 在构建时下载并随静态站点托管；构建需能访问 Google Fonts，读者不需要连接 Google 字体服务。
- 首页保留原有栏目与内容顺序，首屏采用左侧姓名／研究方向、右侧照片的布局；新闻默认显示最近三条，往期动态使用原生 details 展开，不再使用嵌套滚动框。照片、研究卡、导航、各页面正文与页尾共用同一容器对齐。
- 全站页尾由根布局统一渲染一次。插画使用径向透明遮罩融入相同背景，不能通过裁出一个有底色的矩形来替代。
- `/images/siam-logo.webp` 和 `siam-icon-*.png` 来自项目上一级用户提供的 `Logo.png`。
- `/images/siam-background.webp` 来自用户提供的 `background_01.png`，是节日插画，用作页尾装饰，不覆盖正文。原图不改动，WebP 仅用于降低传输体积。
- 人物照片、论文图表、CV、PDF、演示音视频保持原资源。此次未引入第三方下载插画。
- 滚动恢复为浏览器原生行为；波纹仅在用户未要求减少动态效果时启用。正文不会依赖动画完成才可见。

### 轻动效与阅读功能

- `components/experience-provider.tsx` 与 `app/experience.css` 管理动效偏好、页面进度及回到顶部工具。滚动后右下角可暂停动效，偏好仅保存在本机；系统要求减少动效时优先生效。
- 卡片入场、悬停反馈、头像外圈与页尾海浪使用低幅度动画；无自动播放音频、指针追踪或闪烁特效。关闭动效不影响内容、导航或阅读进度。
- `components/zoomable-image.tsx` 为论文列表与 AgenticASR 原有图表增加独立放大按钮；原图片和 URL 不变。支持原始尺寸、适应窗口、Esc 关闭和焦点返回，不拦截原有链接。
- `components/sea-note.tsx` 提供点击换一句的“计算机拾句”。内容为 Alan Perlis 的计算机名言，附 Yale 原文出处和条目编号，中文标注为译文；不会自动轮播。
- Blog 按 `/` 聚焦搜索，输入框内按 Esc 清空并退出；不会抢占其他输入框内的键盘输入。

## 发布前检查

- 桌面与手机：主页、论文、竞赛、荣誉、Blog 和两篇站内文章无横向溢出。
- 中文 / EN：切换、刷新、站内导航后语言正确；论文作者和数值未改变。
- Blog：分类、中文和英文搜索、无结果状态、零篇分类、PDF 下载和站外项目链接。
- 辅助访问：键盘焦点、跳至正文、减少动态效果、禁用 JavaScript 时的内容可读性。
- 不要把 `out/`、`.next/` 或 `*.tsbuildinfo` 提交到仓库。

## 固定 URL 约束

主题、字体或文案调整不得重命名文章目录、迁移原路由或改写原论文资源地址。以下现有路径必须保持可访问：

- `/`
- `/publications/`
- `/competitions/`
- `/honors-awards/`
- `/blog/`
- `/blog/agenticasr/`
- `/blog/tcs-review/`
- `/blog/2026-05-27-test-post/`
- `/notes/`
- `/notes/tcs-review/`

保留 `data/publications.ts`、`data/site.ts` 和论文项目页中的原始链接值；不要为了统一外观而修改项目、论文、代码仓库、数据集、PDF、音视频的 URL。
