#!/bin/sh
# 本地预览脚本：http://127.0.0.1:4000
#
# 说明：仓库里的 Gemfile 面向 GitHub Pages（github-pages 依赖集），本地通常没有安装
# 这套依赖，直接 `bundle exec` 会报 Bundler::GemNotFound。因此这里跳过 bundler，
# 改用系统已安装的 Jekyll 4 及插件（jekyll-paginate / jekyll-sitemap / jekyll-gist /
# jekyll-feed / jekyll-redirect-from / jemoji）。
#
# 若本地已经执行过 `bundle install`，也可以改用：bundle exec jekyll serve

set -e
cd "$(dirname "$0")"

JEKYLL_BIN="$(command -v jekyll || true)"
if [ -z "$JEKYLL_BIN" ]; then
  JEKYLL_BIN="$(gem environment gemdir)/bin/jekyll"
fi

JEKYLL_NO_BUNDLER_REQUIRE=true exec "$JEKYLL_BIN" serve --host 127.0.0.1 --port 4000 --livereload
