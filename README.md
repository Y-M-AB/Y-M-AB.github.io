# 我们的小站 · 我和朋友们

一个用 **Next.js 16 + React 19 + Tailwind CSS 4** 搭的个人 / 团队主页，展示我和朋友们的资料、社交链接、共同经历的时间线和相册。

**所有内容都放在 `data/*.json` 里，改 JSON 就能更新网站，不用动任何组件代码。**

---

## 1. 本地运行

```powershell
cd d:\code\friends-site

# 首次运行先装依赖
npm install

# 启动开发服务器（默认 http://localhost:3000）
npm run dev
```

生产构建：

```powershell
npm run build
npm run start
```

> 说明：这台电脑上的 Node.js 是免安装版，位于
> `C:\Users\<你的用户名>\AppData\Local\Programs\nodejs`。
> 如果新开的终端里提示「无法识别 npm」，可以先把该目录加进 PATH，或者直接用完整路径执行
> `& "$env:LOCALAPPDATA\Programs\nodejs\npm.cmd" run dev`。

---

## 2. 怎么改内容（重点）

### `data/profile.json` —— 我自己

| 字段 | 说明 |
| --- | --- |
| `name` / `englishName` | 中文名 / 英文名（英文名可留空字符串） |
| `title` | 一句话头衔 |
| `location` | 所在城市 |
| `avatar` | 头像路径，把图片放进 `public/avatars/` 再改这里 |
| `greeting` | 首页顶部的小气泡文案 |
| `bio` | 自我介绍（首屏和「关于我」都会用） |
| `tags` | 技能 / 兴趣标签数组（展示在首屏卡片和「关于我」里） |
| `since` | 首屏正计时的起始日期，`"YYYY-MM-DD"`（不填默认 `2023-09-01`） |
| `focus` | 「我们一起做过的事」列表，`icon` 可选：`sparkle`/`clock`/`users`/`image`/`link` |
| `socials` | 社交链接，`icon` 可选：`github`/`mail`/`twitter`/`bilibili`/`weibo`/`zhihu`/`steam`/`youtube`/`wechat`/`link` |

**关于正计时**：首屏卡片上的「我们一起走过了 X 年 X 月 X 日」从 `since` 那天算起，
按**自然年月日**计算（不是除 365 天），客户端每分钟自动校准一次，跨过零点会自己 +1 天。
想改起始日：改 `profile.json` 里的 `since`。

### `data/friends.json` —— 好友列表

数组，每一项：

```json
{
  "id": "唯一标识，别重复",
  "name": "林知夏",
  "englishName": "Summer",
  "role": "前端工程师 · 交互设计爱好者",
  "location": "上海",
  "avatar": "/avatars/friend-1.svg",
  "bio": "一句话介绍",
  "tags": ["React", "动效"],
  "tone": "green",
  "socials": [{ "label": "GitHub", "url": "https://...", "icon": "github" }]
}
```

`tone` 决定这张卡片的配色，可选：
`pink`（粉）、`magenta`（玫红）、`red`（红）、`amber`（橙）、`gold`（金）、`yellow`（黄）、`green`（翠绿）、`forest`（墨绿）、`cyan`（青）、`sky`（蓝）、`violet`（紫）、`silver`（银）。
**不写默认是粉色。**

> 页面底色是米黄，所以深色文字统一用 `-500/-600/-700`，边框用 `-200/-300`，保证跟背景分得开。
> 另外：名字是纯 emoji 时（如 `🦊` `⛵️`）会自动放大一号字号，和文字名字视觉平衡。

每个 `tone` 会同时作用于：姓名 / 身份 / 简介、英文名与城市、头像圈、分隔线、渐变小条、悬停柔光、社交图标。
想加新配色（比如"红""青"），在 `lib/tones.ts` 里照着现有格式复制一段即可。

> 说明：`accent` 是旧字段，已不影响好友卡片外观（`timeline.json` 里的 `accent` 仍然生效，控制时间线节点的颜色）。

> 说明：`tags` 目前**不在卡片上展示**，数据仍保留着（方便以后重新加回来）。
> 想让卡片上重新显示标签，在 `components/FriendCard.tsx` 里把标签那一块加回来即可。

**加好友**：往数组里再复制一段就行，伙伴区标题的「一共 N 位」会自动更新。

### `data/timeline.json` —— 时间线

```json
{ "date": "2025-03", "title": "一起去了海边", "description": "描述", "tag": "旅行", "accent": "rose" }
```

### `data/gallery.json` —— 相册

```json
{ "id": "g1", "title": "海边的傍晚", "description": "说明", "image": "/gallery/g1.svg", "date": "2025-03" }
```

把真实照片放进 `public/gallery/`，然后把 `image` 改成像 `/gallery/photo.jpg` 即可。
`public/` 下的文件可以直接用 `/文件名` 访问，不需要写 `public`。

> 改完 JSON 如果页面没变化：检查 JSON 是否有语法错误（多余/缺失的逗号、括号），
> 或者按 `Ctrl+C` 后重新 `npm run dev`。

---

## 3. 目录结构

```
friends-site/
├─ .github/workflows/
│  └─ deploy-pages.yml     推送到 main 后自动构建并发布到 GitHub Pages
├─ app/
│  ├─ layout.tsx           全站外壳（标题、字体、背景）
│  ├─ page.tsx             首页，把各个区块拼起来
│  └─ globals.css          设计变量、卡片/按钮/动画等样式
├─ components/             页面区块组件
├─ data/                   ★ 所有内容都在这里
├─ lib/                    类型定义、配色表、数据读取
└─ public/                 头像、相册、地图轮廓等静态资源
```

> 项目是**纯静态**的：不连数据库、不需要后端。
> `next.config.mjs` 里开了 `output: "export"`，`npm run build` 会额外生成 `out/` 目录，
> 里面是可以直接丢到任何静态托管（GitHub Pages / 对象存储 / 虚拟主机）的 HTML+CSS+JS。

---

## 4. 功能一览

- 吸顶导航 + 滚动高亮当前区块，移动端有折叠菜单
- 首屏个人卡片：头像、头衔、城市、技能标签、3 个统计数字
- 关于我：自我介绍 + 技能/兴趣标签 + 「我们一起做过的事」
- 好友卡片墙：**每人一色**（`tone` 控制，粉/绿/蓝/紫/橙），文字、头像圈、分隔线、小条、社交图标整套配色跟着变
- 时间线：竖向虚线 + 彩色节点 + 标签
- 相册：视频缩略图 + 播放按钮，点开弹出大图/播放器，支持 `←` `→` 切换、`Esc` 关闭
- **地图**：中国轮廓（本地 GeoJSON，不依赖在线瓦片）+ 每人一个彩色光点，**点击光点**弹出「地点·姓名」，左上角显示定位卡片
- 滚动进入视口时的淡入动效，并遵循系统的「减少动态效果」设置
- 响应式：手机 / 平板 / 桌面都能看

---

## 5. 部署到 Vercel（推荐）

### 5.1 前提：仓库必须是公开的

GitHub Pages 在**免费账号下只支持公开仓库**。私有仓库要开 Pages 需要 GitHub Pro（付费）。

> 结论：仓库设为 **Public**。
> 因为是纯静态站，网站一旦发布，里面的资料本来就是公开的，所以公开仓库不额外泄露什么。

改法：仓库页面 → **Settings** → 拉到底 **Danger Zone** → **Change visibility** → 选 **Make public**。

### 5.2 仓库名必须是 `Y-M-AB.github.io`

这是 GitHub Pages 的**用户主页**约定：

| 仓库名 | 发布后的网址 | 需要额外配置吗 |
| --- | --- | --- |
| `Y-M-AB.github.io` | `https://y-m-ab.github.io/` | ❌ 不用，路径就在根目录 |
| `friends-site` | `https://y-m-ab.github.io/friends-site/` | ⚠️ 要改 `basePath`，还得把 `data/*.json` 里所有 `/avatars/...` 改成带前缀的路径 |

所以选第一种，**代码零改动**，网址也短。

改法：**Settings** → 顶部 **Repository name** → 改成 `Y-M-AB.github.io` → **Rename**。

> GitHub 会为旧地址保留跳转，本地的 `origin` 不用立刻改也能推（但建议改，见 5.4）。

### 5.3 开启 Pages（用 GitHub Actions 部署）

**Settings** → 左侧 **Pages** → **Build and deployment**：

- **Source** 选 **GitHub Actions**（不要选 "Deploy from a branch"）

本仓库里已经带了工作流 `.github/workflows/deploy-pages.yml`，
只要 `main` 分支有推送，它就会自动：装依赖 → `npm run build` → 生成 `out/` → 发布。

**Settings** → 左侧 **Actions** → **General** → 确保 **Workflow permissions** 是
**Read and write permissions**（一般默认就是）。

### 5.4 推送代码

```powershell
cd d:\code\friends-site

# 仓库改名后，更新一下远程地址
git remote set-url origin https://github.com/Y-M-AB/Y-M-AB.github.io.git

git add .
git commit -m "改为静态导出，部署到 GitHub Pages"
git push
```

推完去仓库的 **Actions** 标签页，能看到一次运行；大约 1～3 分钟后变绿 ✅

网站地址：**https://y-m-ab.github.io/**

> 手动触发部署：**Actions** → 左侧 `Deploy to GitHub Pages` → 右上 **Run workflow**。

### 5.5 注意事项

| 事项 | 说明 |
| --- | --- |
| **仓库大小** | 相册视频 `public/gallery/2026-09-01.mp4` 有 **73.7 MB**，超过 GitHub 建议的 50 MB（硬上限 100 MB）。能推上去，但仓库会臃肿。想瘦身可以用 Git LFS 或压缩视频。 |
| **站点流量** | GitHub Pages 免费版软限制约 100 GB/月、站点 1 GB。小站完全够用。 |
| **国内访问** | `*.github.io` 在国内**时通时不通**（DNS 污染/间歇性阻断）。如果朋友经常打不开，建议绑定自己的域名 + Cloudflare CDN，或改用腾讯云 COS / 阿里云 OSS 静态托管。 |
| **API 路由** | 静态导出下**不支持**服务端接口（原来的 `app/api/*` 已删除）。将来若要加留言板、访客统计这类功能，需要换成外部服务（如 Supabase / Cloudflare Workers）。 |
| **改了数据没生效** | 先确认 `git push` 成功，再去 **Actions** 看最新一次运行是不是绿色；**强制刷新**浏览器（`Ctrl+F5`）清缓存。 |

### 5.6 备选：自己的服务器

`npm run build` 后把 `out/` 目录整个丢给 Nginx 当静态根目录即可（不需要 Node 常驻）。
如果还想跑 SSR 版本，则用 `npm run start` + Nginx 反代 3000 端口 + `pm2` 守护。

---

## 6. 换成你们自己的内容

1. 替换 `data/profile.json` 和 `data/friends.json` 里的示例资料（好友现在是 6 位示例数据）。
3. 把 `public/avatars/*.svg` 换成真实头像（jpg/png 也行），同步改 `profile.json` 和 `friends.json` 里的 `avatar`。
4. 把媒体文件（照片/视频）放进 `public/gallery/`，同步改 `gallery.json` 里的 `image`。
4. 改 `app/layout.tsx` 里的 `metadata.title` / `description`。
