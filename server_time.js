// server.js
import express from 'express';
import fetch from 'node-fetch';
import cron from 'node-cron';
import path from 'path';

const app = express();
const PORT = 3000;

// 구글 시트 ID와 API 키 설정
const sheetId = '1bCk0Bk-6-5YgBv5OoO4NyN4pim2_UUx3fC3r-ikYrFs';
const apiKey = 'AIzaSyDJQXs41nWqmmsZLwe1qxPo5iJSO8vNdkk';

// 구글 시트 API URL 설정
const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/시트1!A1:E50?key=${apiKey}`;

// 서버 메모리에 저장할 데이터를 위한 변수
let sheetData = null;

// 10초마다 데이터 업데이트
cron.schedule('*/10 * * * * *', async () => {
  try {
    console.log('Updating data from Google Sheets...');
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.values) {
      sheetData = data.values; // 데이터를 서버 메모리에 저장
      console.log('Data updated successfully.');
    } else {
      console.error('No data found in the Google Sheets response');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

// 클라이언트가 최신 데이터를 요청할 수 있는 API 엔드포인트
app.get('/data', (req, res) => {
  if (sheetData) {
    res.json(sheetData);
  } else {
    res.status(503).send('Data is not available yet. Please try again later.');
  }
});

// 정적 파일 제공 설정
app.use(express.static(path.join(__dirname, 'public')));

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
