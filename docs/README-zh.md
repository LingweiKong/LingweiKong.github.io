# Lingwei KONG 个人主页

发布于 [https://lingweikong.github.io](https://lingweikong.github.io) 的个人学术主页源码。

基于 [Jekyll](https://jekyllrb.com/) 构建，托管于 **GitHub Pages**，用于展示 Lingwei KONG 的学术资料与职业履历，主要板块包括：

- 顶级会议与期刊论文发表
- 专利
- 社会荣誉与公司奖项
- 科研项目
- 教育经历与工作经历
- 公共服务

## 目录结构

```text
_config.yml                  全局站点配置（站点信息、作者主页、SEO、统计）
_pages/about.md              主页内容
_includes/                   可复用的布局片段（head、导航栏、侧边栏、统计等）
_layouts/                    页面布局模板
_data/navigation.yml         导航菜单配置
_sass/                       样式表（SCSS）
assets/                      静态资源（CSS、JS、字体）
images/                      头像与 favicon 文件
google_scholar_crawler/      抓取 Google Scholar 引用数据的爬虫
.github/workflows/           自动更新引用数据的 GitHub Action
```

## Google Scholar 引用统计

仓库中的 GitHub Action 会定时运行 `google_scholar_crawler/` 下的爬虫抓取引用数据，并推送到 `google-scholar-stats` 分支，供主页自动展示引用数量。

只需在仓库中一次性完成以下配置：

1. 在 `Settings -> Secrets and variables -> Actions` 中新增仓库密钥 `GOOGLE_SCHOLAR_ID`，值为你的 Google Scholar 用户 ID。
2. 在 `Actions` 页面启用 workflow。

该 workflow 在每次 `main` 分支更新时触发，同时每天 08:00 UTC 定时执行一次。

## 本地运行

需要 Ruby 与 Jekyll 构建环境（参见 [Jekyll 安装文档](https://jekyllrb.com/docs/installation/)）。

```bash
bash run_server.sh
```

然后在浏览器中打开 <http://127.0.0.1:4000>。修改源码后，livereload 服务器会自动重新编译并刷新页面。
