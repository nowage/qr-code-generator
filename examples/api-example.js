// QR 코드 생성기 API 사용 예제

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// 설정
const config = {
  host: 'localhost',
  port: 3000,
  endpoint: '/api/generate',
  data: 'https://example.com',
  format: 'png', // 'png' 또는 'svg'
  outputFile: 'qrcode-example.' + ('png' || 'svg')
};

// 요청 데이터
const postData = JSON.stringify({
  data: config.data,
  format: config.format
});

// 요청 옵션
const options = {
  hostname: config.host,
  port: config.port,
  path: config.endpoint,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

// 요청 생성 및 전송
const req = http.request(options, (res) => {
  console.log(`상태 코드: ${res.statusCode}`);
  
  // 응답이 이미지 형식이므로 바이너리 데이터로 처리
  const chunks = [];
  res.on('data', (chunk) => {
    chunks.push(chunk);
  });
  
  res.on('end', () => {
    const buffer = Buffer.concat(chunks);
    
    // 파일로 저장
    fs.writeFile(path.join(__dirname, config.outputFile), buffer, (err) => {
      if (err) {
        console.error('파일 저장 중 오류 발생:', err);
        return;
      }
      console.log(`QR 코드가 성공적으로 저장되었습니다: ${config.outputFile}`);
    });
  });
});

req.on('error', (e) => {
  console.error('요청 중 오류 발생:', e.message);
});

// 데이터 전송
req.write(postData);
req.end();

console.log('API 요청 전송 중...');
