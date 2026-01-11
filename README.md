# QR 코드 생성기

Node.js와 Express를 이용한 간단한 QR 코드 생성 웹 애플리케이션입니다.

## 기능

* URL 또는 텍스트 기반 QR 코드 생성
* PNG 및 SVG 형식 지원
* 생성된 QR 코드 다운로드
* API 엔드포인트를 통한 프로그래매틱 사용

## Mac App 지원
본 프로젝트는 macOS 전용 데스크톱 앱을 포함하고 있습니다.
* **시스템 상단 메뉴바(Menu Bar)**에서 간편하게 QR 코드 생성
* **단축키 (`Cmd+Shift+K`)**로 빠른 실행
* 클립보드 내용을 자동으로 QR 코드로 변환
* 생성 기록(History) 관리 및 공유 기능
* **[다운로드 (Mac App v1.0.0)](https://github.com/nowage/qr-code-generator/releases/download/v1.0.0/nowQRGen-mac.zip)**


## 설치 방법

```bash
# 저장소 클론
git clone https://github.com/finfra/qr-code-generator.git
cd qr-code-generator

# 의존성 설치
npm install

# 서버 실행
npm start
```

## 사용 방법

1. 웹 브라우저에서 `http://localhost:3041` 접속
2. 텍스트 필드에 URL 또는 텍스트 입력
3. "QR 코드 생성" 버튼 클릭
4. 생성된 QR 코드 확인 및 다운로드

## API 사용법

### QR 코드 생성 (PNG)

```bash
curl -X POST http://localhost:3041/api/generate \
  -H "Content-Type: application/json" \
  -d '{"data":"https://example.com", "format":"png"}' \
  --output qrcode.png
```

### QR 코드 생성 (SVG)

```bash
curl -X POST http://localhost:3041/api/generate \
  -H "Content-Type: application/json" \
  -d '{"data":"https://example.com", "format":"svg"}' \
  --output qrcode.svg
```

## 주요 의존성

* express: 웹 서버 프레임워크
* qrcode: QR 코드 생성 라이브러리
* ejs: 템플릿 엔진
* body-parser: 요청 본문 파싱

## 라이선스

MIT
