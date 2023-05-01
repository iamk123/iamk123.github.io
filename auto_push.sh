#!/bin/bash
amwiki -c y   # 更新目录
git add .
git commit -m "自动提交"
git push
