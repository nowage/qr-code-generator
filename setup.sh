#!/bin/bash

# QR 코드 생성기 설치 및 실행 스크립트

echo "QR 코드 생성기 설치 시작..."

# 현재 디렉토리 확인
CURRENT_DIR=$(pwd)
echo "현재 디렉토리: $CURRENT_DIR"

# 의존성 설치
echo "의존성 설치 중..."
npm install

# 설치 완료 확인
if [ $? -eq 0 ]; then
  echo "의존성 설치 완료!"
  echo "서버 시작 중..."
  echo "웹 브라우저에서 http://localhost:3000 으로 접속하세요."
  npm start
else
  echo "의존성 설치 중 오류가 발생했습니다."
  exit 1
fi