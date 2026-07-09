# Notion CMS 设置指南

## 1. 注册 Notion 账号

1. 访问 https://www.notion.so/
2. 用邮箱或 Google/Apple 账号注册
3. 登录后创建工作区（可以用默认的）

## 2. 创建 Integration（获取 Token）

1. 访问 https://www.notion.so/my-integrations
2. 点击 **+ New integration**
3. 填写：
   - Name: `Neon Zoo City CMS`
   - Associated workspace: 选择你的工作区
   - Type: Internal
4. 点击 **Submit**
5. 复制 **Internal Integration Token**（以 `secret_` 开头）
6. 把这个 Token 保存好，稍后会用到

## 3. 创建项目数据库

1. 在 Notion 中新建一个页面，标题叫 `Neon Zoo City Projects`
2. 在页面中输入 `/database` 选择 **Database - Inline**
3. 点击数据库右上角 `...` → **Edit view** → **Properties**，添加以下字段：

| 字段名 | 类型 | 说明 |
|---|---|---|
| Name | Title | 项目标题 |
| Slug | Text | URL 标识，如 `singapore-future-city` |
| District | Select | 所属街区：光影剧场 / 远行竞技场 / 高级画廊 / 记忆高塔 / 慢闪档案馆 |
| Location | Text | 地点，如 `新加坡` |
| Year | Number | 年份，如 `2026` |
| Summary | Text | 一句话摘要 |
| Description | Text | 详细描述 |
| Tags | Multi-select | 标签，如 `PBL`, `未来城市`, `研学` |

4. 删除不需要的默认字段（Status、Assignee 等）

## 4. 连接 Integration 到数据库

1. 点击数据库右上角 `...`
2. 选择 **Connections** → **Add connections**
3. 搜索并选择你创建的 `Neon Zoo City CMS`
4. 确认添加

## 5. 获取 Database ID

1. 在浏览器中打开你的 Notion 数据库页面
2. 复制 URL，格式类似：
   ```
   https://www.notion.so/username/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx?v=...
   ```
3. `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` 这一段就是 Database ID

## 6. 配置本地环境变量

1. 在项目根目录创建 `.env` 文件：
   ```bash
   cp .env.example .env
   ```
2. 编辑 `.env`，填入：
   ```
   NOTION_TOKEN=secret_你复制的token
   NOTION_DATABASE_ID=你复制的database-id
   ```

## 7. 录入项目数据

在 Notion 数据库中添加项目，例如：

| Name | Slug | District | Location | Year | Summary | Description | Tags |
|---|---|---|---|---|---|---|---|
| 新加坡 · 未来生态之城 | singapore-future-city | 远行竞技场 | 新加坡 | 2026 | 新加坡未来城市设计 PBL 研学项目 | 带队参与新加坡科技文化双语交流项目... | PBL, 未来城市, 双语研学 |
| 英国 · 哈利波特魔法学院 | uk-harry-potter | 远行竞技场 | 英国 | 2025 | 哈利波特主题夏校 | 设计并执行英国哈利波特主题夏校... | 夏校, 游戏化, 学院制 |

## 8. 同步到网站

运行同步脚本：

```bash
cd /Users/qite/personal-archive/backend
python3 notion_sync.py
```

然后重新构建网站：

```bash
cd /Users/qite/personal-archive/frontend
export PATH="$HOME/.local/node/bin:$PATH"
npm run build
```

## 9. 以后更新内容

1. 在 Notion 中修改/添加项目
2. 运行 `python3 notion_sync.py`
3. 运行 `npm run build`
4. 刷新网站即可看到更新

---

## 注意事项

- 图片和视频继续放在 `frontend/public/` 文件夹中，Notion 只管理文字数据
- 如果某个字段为空，脚本会使用默认值或留空
- Slug 如果为空，会自动从 Name 生成
- District 字段必须严格使用这五个之一：光影剧场 / 远行竞技场 / 高级画廊 / 记忆高塔 / 慢闪档案馆
