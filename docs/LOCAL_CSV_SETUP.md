# 本地 CSV 内容管理方案

如果 Notion API 暂时无法连通，可以直接用本地 CSV 管理项目内容。

## 文件位置

- 数据源：[`data/projects_import.csv`](../data/projects_import.csv)
- 同步脚本：[`backend/local_sync.py`](../backend/local_sync.py)
- 生成目标：[`frontend/lib/generated-data.ts`](../frontend/lib/generated-data.ts)

## CSV 字段说明

| 字段 | 说明 | 示例 |
|---|---|---|
| Name | 项目标题 | 新加坡 · 未来生态之城研学 |
| Slug | URL 标识，留空会自动生成 | singapore-future-city |
| District | 所属街区：光影剧场 / 远行竞技场 / 高级画廊 / 记忆高塔 / 慢闪档案馆 | 远行竞技场 |
| Location | 地点 | 新加坡 |
| Year | 年份 | 2026 |
| Summary | 一句话摘要 | 新加坡未来城市设计 PBL 研学项目... |
| Description | 详细描述 | 带队参与新加坡科技文化双语交流项目... |
| Tags | 标签，用逗号分隔 | PBL, 未来城市, 双语研学 |

## 更新内容

1. 用 Excel / Numbers / VSCode 编辑 [`data/projects_import.csv`](../data/projects_import.csv)
2. 保存为 UTF-8 编码的 CSV
3. 运行同步脚本：

```bash
cd /Users/qite/personal-archive/backend
python3 local_sync.py
```

4. 重新构建网站：

```bash
cd /Users/qite/personal-archive/frontend
export PATH="$HOME/.local/node/bin:$PATH"
npm run build
```

## 切换回 Notion（以后想用时）

1. 解决 Notion token 问题
2. 运行：

```bash
cd /Users/qite/personal-archive/backend
python3 notion_sync.py
```

`notion_sync.py` 会覆盖 `generated-data.ts`，重新从 Notion 拉取数据。

## 注意事项

- 图片和视频继续放在 `frontend/public/` 中，CSV 只管理文字数据
- CSV 中的 Slug 留空时，会自动从 Name 生成
- District 必须严格使用五个中文名称之一
