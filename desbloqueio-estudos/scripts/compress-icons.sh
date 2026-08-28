#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/.."
mkdir -p /tmp/desbloqueio-icons
for file in icon.png splash-icon.png favicon.png android-icon-foreground.png; do
  ffmpeg -loglevel error -y -i "assets/images/$file" -vf scale=512:512 -pix_fmt rgb24 "/tmp/desbloqueio-icons/$file"
  cp "/tmp/desbloqueio-icons/$file" "assets/images/$file"
done
rm -rf /tmp/desbloqueio-icons
