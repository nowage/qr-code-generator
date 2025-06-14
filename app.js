const express = require('express');
const bodyParser = require('body-parser');
const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3014;

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

// EJS 템플릿 엔진 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body parser 설정
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 디렉토리 생성 (없을 경우)
const qrDir = path.join(__dirname, 'public', 'qr');
if (!fs.existsSync(qrDir)) {
  fs.mkdirSync(qrDir, { recursive: true });
}

// 라우트
app.get('/', (req, res) => {
  res.render('index', { qrUrl: null, data: null });
});

app.post('/generate', async (req, res) => {
  try {
    const data = req.body.data || 'https://example.com';
    const filename = `qr-${Date.now()}.png`;
    const filePath = path.join('public', 'qr', filename);
    const qrUrl = `/qr/${filename}`;
    
    // QR 코드 생성
    await QRCode.toFile(path.join(__dirname, filePath), data, {
      errorCorrectionLevel: 'H',
      margin: 1,
      scale: 10,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    });
    
    res.render('index', { qrUrl, data });
  } catch (err) {
    console.error(err);
    res.status(500).send('QR 코드 생성 중 오류 발생');
  }
});

// 다운로드 엔드포인트
app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'public', 'qr', filename);
  
  res.download(filePath, filename, (err) => {
    if (err) {
      console.error(err);
      res.status(404).send('파일을 찾을 수 없음');
    }
  });
});

// API 엔드포인트
app.post('/api/generate', async (req, res) => {
  try {
    const data = req.body.data || 'https://example.com';
    const format = req.body.format || 'png'; // png 또는 svg
    
    if (format === 'svg') {
      const svg = await QRCode.toString(data, {
        type: 'svg',
        errorCorrectionLevel: 'H',
        margin: 1
      });
      res.set('Content-Type', 'image/svg+xml');
      return res.send(svg);
    }
    
    const qrBuffer = await QRCode.toBuffer(data, {
      errorCorrectionLevel: 'H',
      margin: 1,
      scale: 10
    });
    
    res.set('Content-Type', 'image/png');
    res.send(qrBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'QR 코드 생성 중 오류 발생' });
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 실행 중입니다: http://localhost:${PORT}`);
});