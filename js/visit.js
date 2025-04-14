import { nowData } from "./common.js";

/*
nowData ={
    year
    month
    day
    hours
    minutes
    seconds
}
*/

// 방문자 통계 ####################################################
function Statistics() {
  const userStatistics = document.getElementById("users-statistics");
  // 일간 사용자
  const userDay = document.getElementById("users-day");
  const userDay_date = userDay.querySelector(".txt-day");
  const userDay_than = userDay.querySelector(".thanData");
  // 월간 사용자
  const userMonth = document.getElementById("users-month");
  const userMonth_date = userMonth.querySelector(".txt-day");
  const userMonth_than = userMonth.querySelector(".thanData");
  // 재방문자
  const userReturn = document.getElementById("users-return");

  userDay_date.textContent = `${nowData.year}년 ${nowData.month}월 ${nowData.day}일`;
  userMonth_date.textContent = `${nowData.year}년 ${nowData.month}월`;
}
Statistics();

// "일일 활성 사용자" 도넛 그래프
function usersDay_chart() {
  const centerTextPlugin = {
    id: "centerText",
    beforeDraw(chart) {
      const { width } = chart;
      const { height } = chart;
      const ctx = chart.ctx;
      ctx.restore();

      const text = "793,250명"; // 가운데에 표시할 텍스트
      const fontSize = (height / 100).toFixed(2); // 폰트 크기 자동 조절
      ctx.font = `${fontSize * 12}px Pretendard-R`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.position = "absolute";

      const x = width / 2;
      const y = height / 2;

      ctx.fillStyle = "#000"; // 텍스트 색상
      ctx.fillText(text, x, y);
      ctx.save();
    },
  };

  // 차트 데이터와 옵션 설정
  const data = {
    datasets: [
      {
        data: [793250, 933235 - 793250],
        backgroundColor: ["#A258F7", "transparent"], // 채워진 부분, 비어있는 부분 색상
        borderWidth: 0,
        cutout: "85%", // 도넛 중앙 크기
        borderRadius: 10,
      },
    ],
  };

  const options = {
    responsive: false, // 크기를 고정으로
    plugins: {
      legend: {
        display: false, // 범례 숨기기
      },
      tooltip: {
        enabled: false, // 툴팁 숨기기
      },
    },
  };
  // 차트 생성
  new Chart(document.getElementById("users-day").querySelector("canvas"), {
    type: "doughnut",
    data: data,
    options: options,
    plugins: [centerTextPlugin],
  });
}
usersDay_chart();

// "월간 활성 사용자" 도넛 그래프
function usersMonth_chart() {
  const centerTextPlugin = {
    id: "centerText",
    beforeDraw(chart) {
      const { width } = chart;
      const { height } = chart;
      const ctx = chart.ctx;
      ctx.restore();

      const text = "6,558,695명"; // 가운데에 표시할 텍스트
      const fontSize = (height / 100).toFixed(2); // 폰트 크기 자동 조절
      ctx.font = `${fontSize * 12}px Pretendard-R`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.position = "absolute";

      const x = width / 2;
      const y = height / 2;

      ctx.fillStyle = "#000"; // 텍스트 색상
      ctx.fillText(text, x, y);
      ctx.save();
    },
  };

  // 차트 데이터와 옵션 설정
  const data = {
    datasets: [
      {
        data: [6558695, 8744926 - 6558695],
        backgroundColor: ["#A258F7", "transparent"], // 채워진 부분, 비어있는 부분 색상
        borderWidth: 0,
        cutout: "85%", // 도넛 중앙 크기
        borderRadius: 10,
      },
    ],
  };

  const options = {
    responsive: false, // 크기를 고정으로
    plugins: {
      legend: {
        display: false, // 범례 숨기기
      },
      tooltip: {
        enabled: false, // 툴팁 숨기기
      },
    },
  };
  // 차트 생성
  new Chart(document.getElementById("users-month").querySelector("canvas"), {
    type: "doughnut",
    data: data,
    options: options,
    plugins: [centerTextPlugin],
  });
}
usersMonth_chart();

// "재방문자 수" 도넛 그래프
function usersReturn_chart() {
  const centerTextPlugin = {
    id: "centerText",
    beforeDraw(chart) {
      const { width } = chart;
      const { height } = chart;
      const ctx = chart.ctx;
      ctx.restore();

      const text = "67.91%"; // 가운데에 표시할 텍스트
      const fontSize = (height / 100).toFixed(2); // 폰트 크기 자동 조절
      ctx.font = `${fontSize * 12}px Pretendard-R`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.position = "absolute";

      const x = width / 2;
      const y = height / 2;

      ctx.fillStyle = "#000"; // 텍스트 색상
      ctx.fillText(text, x, y);
      ctx.save();
    },
  };

  // 차트 데이터와 옵션 설정
  const totalData = {
    datasets: [
      {
        data: [13958733, 16958733 - 13958733],
        backgroundColor: ["#E0C1FF", "transparent"], // 채워진 부분, 비어있는 부분 색상
        borderWidth: 0,
        cutout: "85%", // 도넛 중앙 크기
        borderRadius: 10,
        weight: 2,
      },
    ],
  };
  const data = {
    datasets: [
      {
        data: [9479931, 16958733 - 9479931],
        backgroundColor: ["#A258F7", "transparent"], // 채워진 부분, 비어있는 부분 색상
        borderWidth: 0,
        cutout: "85%", // 도넛 중앙 크기
        borderRadius: 10,
        weight: 2,
      },
    ],
  };

  const options = {
    responsive: false, // 크기를 고정으로
    plugins: {
      legend: {
        display: false, // 범례 숨기기
      },
      tooltip: {
        enabled: false, // 툴팁 숨기기
      },
    },
  };
  // 차트 생성
  new Chart(document.getElementById("users-return").querySelector("canvas.totalChart"), {
    type: "doughnut",
    data: totalData,
    options: options,
    plugins: [centerTextPlugin],
  });
  new Chart(document.getElementById("users-return").querySelector("canvas.currentChart"), {
    type: "doughnut",
    data: data,
    options: options,
  });
}
usersReturn_chart();

// 방문시간 별 사용자 수 ####################################################
function usersVisitTime() {
  const data = {
    datasets: [
      {
        data: [
          9479931, 9479931, 9479931, 9479931, 9479931, 9479931, 9479931, 9479931, 9479931, 9479931, 9479931, 9479931,
        ],
      },
    ],
    labels: [
      "00:00",
      "02:00",
      "04:00",
      "06:00",
      "08:00",
      "10:00",
      "12:00",
      "14:00",
      "16:00",
      "18:00",
      "20:00",
      "22:00",
      "24:00",
    ],
  };

  const options = {
    responsive: false, // 크기를 고정으로
    scales:{
        y:{
            min:0,
            max:30000,
            ticks:{
                stepSize:5000,
            }
        }
    },
    plugins: {
      legend: {
        display: false, // 범례 숨기기
      },
      tooltip: {
        enabled: false, // 툴팁 숨기기
      },
    },
    animation: 1000,
  };
  new Chart(document.getElementById("users-visitTime").querySelector("canvas"), {
    type: "line",
    data: data,
    options: options,
  });
}
usersVisitTime();
// "방문자시간 별 사용자 수" 영역에 현재 날짜/시간 표시
function usersVisit_currentTime() {}
usersVisit_currentTime();
