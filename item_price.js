const sheetId = '1bCk0Bk-6-5YgBv5OoO4NyN4pim2_UUx3fC3r-ikYrFs'; // 구글 시트 ID
const apiKey = 'AIzaSyDJQXs41nWqmmsZLwe1qxPo5iJSO8vNdkk'; // 구글 시트 API 키

// API 호출 URL (Sheet 이름을 정확하게 설정)
const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/시트1!A1:E50?key=${apiKey}`;

async function fetchData() {
  try {
    // Fetch API를 통해 구글 시트 데이터를 가져옴
    const response = await fetch(url);

    // 응답을 JSON 형식으로 변환
    const data = await response.json();

    // 상태 코드가 200 범위를 벗어나면 오류 처리
    if (!response.ok) {
      console.error(`Error fetching data: ${data.error.message}`);
      throw new Error(`API request failed with status ${response.status}`);
    }

    // 데이터가 존재하는지 확인
    if (!data.values) {
      console.error('No data found in the API response');
      return;
    }

    // 데이터를 화면에 표시하는 함수 호출
    displayData(data.values);

  } catch (error) {
    // API 요청 실패 시 오류 메시지 출력
    console.error('Error fetching data:', error.message);
  }
}

function displayData(data) {
  const container = document.getElementById('sheet-data');
  container.innerHTML = ''; // 기존 데이터를 지움

  // 데이터를 화면에 표시
  data.forEach((row, index) => {
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');

    row.forEach(cell => {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      cellElement.textContent = cell;
      rowElement.appendChild(cellElement);
    });

    container.appendChild(rowElement);
  });
}

// 페이지 로드 시 데이터 가져오기
fetchData();
