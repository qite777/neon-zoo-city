#!/usr/bin/env python3
"""
Scan Desktop/last文件夹 and generate portfolio data for the Neon Zoo City website.

This is step 1 of the pipeline: file discovery and basic metadata extraction.
It does NOT use LLM APIs. It uses directory names and file types to infer project info.
"""

import json
import os
import re
from pathlib import Path
from datetime import datetime

HOME = Path.home()
TARGET_DIR = HOME / "Desktop" / "last文件夹"
OUTPUT_FILE = Path(__file__).parent.parent / "frontend" / "lib" / "generated-data.ts"

# File extensions we care about
MEDIA_EXTS = {".jpg", ".jpeg", ".png", ".gif", ".webp", ".mp4", ".mov", ".heic"}
DOC_EXTS = {".pdf", ".docx", ".doc", ".pptx", ".ppt", ".xlsx", ".xls", ".md", ".txt"}
SKIP_DIRS = {"__pycache__", ".git", ".DS_Store", "node_modules", ".venv"}
SKIP_FILES = {".DS_Store", "desktop.ini", ".localized"}

# Directories that are support materials, not standalone projects
SKIP_PROJECT_NAMES = {
    "qianzheng需求（齐特）",
    "协议",
    "工商户注册",
    "机票",
    "领队清单",
}


def slugify(text: str) -> str:
    """Convert Chinese/English text to URL-safe slug."""
    text = text.strip()
    # Replace common separators
    text = re.sub(r"[\s\/\\|\-\–—]+", "-", text)
    # Remove special chars but keep Chinese and alphanumeric
    text = re.sub(r"[^\w一-鿿\-]", "", text)
    text = text.strip("-")
    # Limit length
    return text[:60] or "project"


def detect_year(name: str) -> int:
    """Try to extract a year from directory name."""
    match = re.search(r"20(\d{2})", name)
    if match:
        return int("20" + match.group(1))
    return datetime.now().year


def detect_location(name: str) -> str:
    """Infer project location from directory name."""
    location_keywords = {
        "新加坡": "新加坡",
        "英国": "英国",
        "芬兰": "芬兰",
        "香港": "香港",
        "港深": "香港 / 深圳",
        "云南": "云南",
        "贵州": "贵州",
        "湖南": "湖南",
        "湘西": "湘西",
        "清迈": "清迈",
        "澳洲": "澳洲",
        "澳大利亚": "澳大利亚",
        "惠通村": "云南 / 惠通村",
    }
    for key, value in location_keywords.items():
        if key in name:
            return value
    return "多地"


def detect_district(name: str) -> str:
    """Map directory name to website district slug."""
    name_lower = name.lower()
    if any(k in name for k in ["研学", "英国", "新加坡", "芬兰", "港深", "澳洲", "夏令营", "冬令营"]):
        return "arena"  # Sprint's expedition arena
    if any(k in name for k in ["惠通村", "aigc", "摄影", "短片", "创作", "作品"]):
        return "theater"  # Vex's theater
    if any(k in name for k in ["清迈", "市集", "艺术家", "商业", "考察", "画廊"]):
        return "gallery"  # Orchid's gallery
    if any(k in name for k in ["复盘", "绩效", "战略", "布局", "策略"]):
        return "tower"  # Noctis's timeline tower
    return "arena"  # Default to arena for now


def generate_title(name: str) -> str:
    """Generate a human-readable project title from directory name."""
    # Clean up common suffixes
    name = re.sub(r"\.pdf$|\.docx?$|\.pptx?$", "", name)
    name = name.strip()

    title_map = {
        "2025暑期英国": "英国 · 哈利波特魔法学院夏校",
        "2026寒假新加坡": "新加坡 · 未来生态之城研学",
        "2026年寒假芬兰": "芬兰 · SISU 极光挑战营",
        "2025暑期香港营前文件": "香港 · 成长生态评估研学",
        "田园科创·数绘乡村 —— 惠通村AIGC三生融合未来智慧农业科创营": "惠通村 · AIGC 三生融合科创营",
    }
    if name in title_map:
        return title_map[name]

    # Try to make it nicer
    if "暑期" in name:
        name = name.replace("暑期", " · 暑期")
    if "寒假" in name:
        name = name.replace("寒假", " · 寒假")
    if "营前" in name:
        name = name.replace("营前", " · 营前")

    return name


def generate_summary(name: str, file_count: int, doc_count: int, media_count: int) -> str:
    """Generate a short project summary."""
    if "英国" in name:
        return f"英国哈利波特主题夏校项目，包含营前手册、游戏机制与带队资料，共整理 {file_count} 份文件。"
    if "新加坡" in name:
        return f"新加坡未来城市设计 PBL 研学项目，包含课程任务、调研表单与营前手册，共整理 {file_count} 份文件。"
    if "芬兰" in name:
        return f"芬兰 SISU 极光挑战营项目，涵盖行程设计、反思圈与签证资料，共整理 {file_count} 份文件。"
    if "香港" in name or "港深" in name:
        return f"港深研学项目与成长生态评估体系，包含全流程管理框架与评估工具，共整理 {file_count} 份文件。"
    if "惠通村" in name or "AIGC" in name.upper():
        return f"云南惠通村 AIGC 三生融合科创营，包含调研报告、课程手册与短片资料，共整理 {file_count} 份文件。"
    if "复盘" in name or "绩效" in name:
        return f"国际教育业务复盘与战略布局资料，包含绩效分析与项目规划，共整理 {file_count} 份文件。"

    return f"从桌面整理的「{name}」项目资料，包含 {file_count} 份文件（{doc_count} 份文档，{media_count} 份媒体）。"


def generate_description(name: str, summary: str, sample_files: list) -> str:
    """Generate a longer project description."""
    file_names = "、".join(sample_files[:8]) if sample_files else "相关项目资料"
    return f"{summary}\n\n项目资料包括：{file_names} 等。这些文件记录了项目从筹备、执行到复盘的完整过程。"


def generate_tags(name: str, ext_counts: dict) -> list:
    """Generate tags based on directory name and file types."""
    tags = []

    # Location tags
    if "新加坡" in name:
        tags.extend(["新加坡", "未来城市", "PBL"])
    if "英国" in name:
        tags.extend(["英国", "哈利波特", "夏校"])
    if "芬兰" in name:
        tags.extend(["芬兰", "极光", "自然教育"])
    if "香港" in name or "港深" in name:
        tags.extend(["港深", "评估体系", "带队"])
    if "惠通村" in name or "AIGC" in name.upper():
        tags.extend(["AIGC", "乡村支教", "三生融合"])
    if "清迈" in name:
        tags.extend(["清迈", "市集", "艺术家"])
    if "复盘" in name or "绩效" in name:
        tags.extend(["复盘", "战略布局", "绩效分析"])

    # File type tags
    if ext_counts.get("pdf", 0) > 0:
        tags.append("PDF 资料")
    if ext_counts.get("docx", 0) > 0 or ext_counts.get("doc", 0) > 0:
        tags.append("Word 文档")
    if ext_counts.get("pptx", 0) > 0 or ext_counts.get("ppt", 0) > 0:
        tags.append("PPT 课件")
    if ext_counts.get("xlsx", 0) > 0 or ext_counts.get("xls", 0) > 0:
        tags.append("数据表格")
    if ext_counts.get("mp4", 0) > 0 or ext_counts.get("mov", 0) > 0:
        tags.append("视频素材")
    if ext_counts.get("jpg", 0) > 0 or ext_counts.get("jpeg", 0) > 0 or ext_counts.get("png", 0) > 0:
        tags.append("图片素材")

    # Deduplicate and limit
    seen = set()
    unique_tags = []
    for tag in tags:
        if tag not in seen:
            seen.add(tag)
            unique_tags.append(tag)
    return unique_tags[:8]


def scan_directory(dir_path: Path) -> dict:
    """Scan a single project directory."""
    files = []
    ext_counts = {}
    sample_files = []

    for root, dirs, filenames in os.walk(dir_path):
        # Skip system directories
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]

        for filename in filenames:
            if filename in SKIP_FILES:
                continue

            file_path = Path(root) / filename
            ext = file_path.suffix.lower()

            if ext in MEDIA_EXTS or ext in DOC_EXTS:
                files.append({
                    "name": filename,
                    "path": str(file_path),
                    "ext": ext,
                })
                ext_counts[ext.lstrip(".")] = ext_counts.get(ext.lstrip("."), 0) + 1

                # Collect sample file names (without extension)
                if len(sample_files) < 15:
                    clean_name = re.sub(r"\.(pdf|docx?|pptx?|xlsx?|png|jpe?g|mp4|mov)$", "", filename, flags=re.I)
                    if clean_name and clean_name not in sample_files:
                        sample_files.append(clean_name)

    doc_count = sum(ext_counts.get(e, 0) for e in ["pdf", "docx", "doc", "pptx", "ppt", "xlsx", "xls", "md", "txt"])
    media_count = sum(ext_counts.get(e, 0) for e in ["jpg", "jpeg", "png", "gif", "webp", "mp4", "mov", "heic"])

    return {
        "files": files,
        "ext_counts": ext_counts,
        "sample_files": sample_files,
        "file_count": len(files),
        "doc_count": doc_count,
        "media_count": media_count,
    }


def discover_projects():
    """Discover all projects in the target directory."""
    if not TARGET_DIR.exists():
        print(f"Target directory not found: {TARGET_DIR}")
        return []

    projects = []

    for item in sorted(TARGET_DIR.iterdir()):
        if not item.is_dir():
            continue
        if item.name in SKIP_DIRS:
            continue
        if item.name in SKIP_PROJECT_NAMES:
            continue

        scan = scan_directory(item)
        if scan["file_count"] == 0:
            continue

        name = item.name
        title = generate_title(name)
        slug = slugify(title)
        district = detect_district(name)
        location = detect_location(name)
        year = detect_year(name)
        summary = generate_summary(name, scan["file_count"], scan["doc_count"], scan["media_count"])
        description = generate_description(name, summary, scan["sample_files"])
        tags = generate_tags(name, scan["ext_counts"])

        projects.append({
            "id": slug,
            "title": title,
            "slug": slug,
            "districtSlug": district,
            "location": location,
            "summary": summary,
            "description": description,
            "tags": tags,
            "year": year,
            "assets": [],
            "fileCount": scan["file_count"],
            "docCount": scan["doc_count"],
            "mediaCount": scan["media_count"],
            "sourceDir": str(item),
        })

    return projects


def write_typescript_data(projects: list):
    """Write discovered projects as TypeScript data file."""
    # Sort projects by year desc, then by title
    projects.sort(key=lambda p: (-p["year"], p["title"]))

    data = {
        "projects": projects,
        "generatedAt": datetime.now().isoformat(),
        "sourceDir": str(TARGET_DIR),
    }

    json_str = json.dumps(data, ensure_ascii=False, indent=2)

    ts_content = f'''// Auto-generated by backend/scanner.py
// Do not edit manually. Run scanner.py to regenerate.

import {{ Project }} from "@/types";

export const generatedProjects: {{ projects: Project[]; generatedAt: string; sourceDir: string }} = {json_str};
'''

    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_FILE.write_text(ts_content, encoding="utf-8")
    print(f"Generated: {OUTPUT_FILE}")
    print(f"Total projects: {len(projects)}")


def main():
    print(f"Scanning: {TARGET_DIR}")
    projects = discover_projects()
    write_typescript_data(projects)

    print("\nDiscovered projects:")
    for p in projects:
        print(f"  - {p['title']} ({p['districtSlug']}, {p['fileCount']} files)")


if __name__ == "__main__":
    main()
