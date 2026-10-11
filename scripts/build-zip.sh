#!/usr/bin/env sh
# Rebuilds downloads/abyss-all.zip from everything else in downloads/.
set -e
cd "$(dirname "$0")/../public/downloads"
rm -f abyss-all.zip
zip -qr abyss-all.zip . -x abyss-all.zip -x '*.DS_Store'
echo "Built downloads/abyss-all.zip ($(du -h abyss-all.zip | cut -f1))"
