const sheetId = '1bCk0Bk-6-5YgBv5OoO4NyN4pim2_UUx3fC3r-ikYrFs'; // 구글 시트 ID
const apiKey = 'AIzaSyDJQXs41nWqmmsZLwe1qxPo5iJSO8vNdkk'; // 구글 시트 API 키

// API 호출 URL (Sheet 이름을 정확하게 설정)
const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/시트1!A1:E50?key=${apiKey}`;

async function fetchData() {
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (!data.values) {
        console.error('No data found in the API response');
        return;
      }
  
      displayData(data.values); // 데이터를 HTML에 표시하는 함수 호출
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  function displayData(data) {
    const tableBody = document.querySelector('#sheet-data tbody');
    tableBody.innerHTML = ''; // 기존 데이터를 지움
  
    data.forEach((row, rowIndex) => {
      if (rowIndex === 0) return; // 첫 번째 행(헤더)은 건너뜀
  
      const rowElement = document.createElement('tr'); // 테이블 행 생성
  
      row.forEach((cell, colIndex) => {
        const cellElement = document.createElement('td');
  
        if (colIndex === 4) { // 세 번째 열이 이미지 URL로 가정
          const imgElement = document.createElement('img');
          imgElement.src = cell; // 이미지 URL
          imgElement.alt = 'Product Image';
          imgElement.style.width = '100px'; // 이미지 크기 조정
          cellElement.appendChild(imgElement);
        } else {
          cellElement.textContent = cell; // 다른 셀은 텍스트로 처리
        }
  
        rowElement.appendChild(cellElement);
      });
  
      tableBody.appendChild(rowElement); // 테이블에 행 추가
    });
  }
  
  fetchData(); // 페이지 로드 시 데이터 가져오기
  
