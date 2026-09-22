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
| `stats` | 右侧卡片里的三个小数字 |
| `focus` | 「我们一起做过的事」列表，`icon` 可选：`sparkle`/`clock`/`users`/`image`/`link` |
| `socials` | 社交链接，`icon` 可选：`github`/`mail`/`twitter`/`bilibili`/`weibo`/`zhihu`/`steam`/`youtube`/`wechat`/`link` |

**注意：`stats` 里的「伙伴」数字是手写的**，不会自动跟着 `friends.json` 变；改好友数量时记得一起改。

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

> 说明：`tags` 目前**不在卡片上展示**，数据仍保留着（`/api/friends?tag=xxx` 接口依然能按标签筛选）。
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
├─ app/
│  ├─ layout.tsx           全站外壳（标题、字体、背景）
│  ├─ page.tsx             首页，把各个区块拼起来
│  ├─ globals.css          设计变量、卡片/按钮/动画等样式
│  └─ api/                 后端接口（读 JSON 返回数据）
│     ├─ content/route.ts  GET /api/content  全部数据
│     ├─ profile/route.ts  GET /api/profile  我的资料
│     ├─ friends/route.ts  GET /api/friends?tag=&q=  好友（支持筛选）
│     ├─ timeline/route.ts GET /api/timeline 时间线
│     └─ gallery/route.ts  GET /api/gallery  相册
├─ components/             页面区块组件
├─ data/                   ★ 所有内容都在这里
├─ lib/                    类型定义、配色表、数据读取
└─ public/                 头像、相册等静态图片
```

---

## 4. 功能一览

- 吸顶导航 + 滚动高亮当前区块，移动端有折叠菜单
- 首屏个人卡片：头像、头衔、城市、技能标签、3 个统计数字
- 关于我：自我介绍 + 技能/兴趣标签 + 「我们一起做过的事」
- 好友卡片墙：**每人一色**（`tone` 控制，粉/绿/蓝/紫/橙），文字、头像圈、分隔线、小条、社交图标整套配色跟着变
- 时间线：竖向虚线 + 彩色节点 + 标签
- 相册：瀑布式错位排列，点开大图，支持 `←` `→` 切换、`Esc` 关闭
- 滚动进入视口时的淡入动效，并遵循系统的「减少动态效果」设置
- 响应式：手机 / 平板 / 桌面都能看

---

## 5. 部署到 Vercel（推荐）

### 5.1 准备：装 Git

去 <https://git-scm.com/download/win> 下载 **Git for Windows**，一路下一步装完。
装完后**重开一个终端**，输入 `git --version` 能打印版本号就说明好了。

> 这台电脑上已经装过一份**免安装版 Git**，位置在
> `C:\Users\<你的用户名>\AppData\Local\Programs\PortableGit`，
> 里面有个 `git-bash.exe`，双击就能用。
> 如果 VS Code 里提示找不到 Git，把它加进用户 PATH 即可，或者直接装上面那个正式版覆盖。

### 5.2 第一次提交（只做一次）

在 VS Code 里打开 `friends-site` 文件夹，点左侧 **源代码管理** 图标（三个圆圈连着一条线），

1. 点 **初始化仓库**
2. 在消息框里写 `首次提交`，点 **提交**
3. 点 **发布分支 / Publish to GitHub**
4. 选 **GitHub 私有仓库**（推荐，别人搜不到）
5. 按提示登录 GitHub（会弹浏览器授权，点允许就行）

推上去之后，仓库地址形如 `https://github.com/你的用户名/friends-site`。

> 也可以用命令行做同样的事：
>
> ```powershell
> cd d:\code\friends-site
> git init
> git add .
> git commit -m "首次提交"
> git branch -M main
> git remote add origin https://github.com/你的用户名/friends-site.git
> git push -u origin main
> ```
>
> 第一次 `git push` 会弹窗让你登录 GitHub，按提示走完即可。

### 5.3 在 Vercel 上导入

1. 打开 <https://vercel.com> → **Sign Up** → 选 **Continue with GitHub** 授权登录
2. 进 **Add New… → Project**
3. 找到刚推上去的 `friends-site`，点 **Import**
4. 框架会自动识别成 **Next.js**，**不用改任何配置**，直接点 **Deploy**
5. 等 1～2 分钟，就得到一个形如 `https://friends-site-xxxx.vercel.app` 的网址，发给朋友就能看了

**以后更新**：本地改完 `data/*.json` → 提交 → 推送，Vercel 会自动重新部署（大约 1 分钟）。

### 5.4 注意事项

| 事项 | 说明 |
| --- | --- |
| **仓库大小** | 相册视频 `public/gallery/2026-09-01.mp4` 有 **73.7 MB**，GitHub 单个文件上限是 100 MB，能推上去，但仓库会比较臃肿、首次推送较慢。 |
| **流量** | Vercel 免费版每月 100 GB 流量，小站完全够用。大视频会被反复下载，注意别放太多。 |
| **国内访问** | Vercel 的默认域名在国内速度一般（偶有波动）。想更快可以绑定自己的域名，或用腾讯云 COS / 阿里云 OSS 做静态托管。 |
| **图片优化** | 项目用了 Next.js 的图片优化，Vercel 上开箱可用。若部署到别处需要额外配置。 |
| **改数据后没生效** | 确认已经 `git push` 成功；也可以去 Vercel 项目的 **Deployments** 页面看最新一次部署是不是成功状态（绿色）。 |

### 5.5 备选：自己的服务器

`npm run build` 后 `npm run start`，用 Nginx 反向代理到 3000 端口，配合 `pm2` 守护进程。

---

## 6. 换成你们自己的内容

1. 替换 `data/profile.json` 和 `data/friends.json` 里的示例资料（好友现在是 6 位示例数据）。
2. 把 `public/avatars/*.svg` 换成真实头像（jpg/png 也行），同步改 JSON 里的 `avatar`。
3. 把 `public/gallery/*.svg` 换成真实照片，同步改 `gallery.json` 里的 `image`。
4. 改 `app/layout.tsx` 里的 `metadata.title` / `description`。
