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

// 이용 시간 ####################################################
// "이용 시간" 가로 막대 그래프
function usageTime_chart() {
  const ctx = document.getElementById("totalUsageTime").querySelector("canvas").getContext("2d");

  // 지난 일주일 배열로 만들기
  // 요일 한글 배열
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
  const now = new Date(nowData.year, nowData.month - 1, nowData.day);
  // for문으로 배열 lastWeek에 저장
  const lastWeek = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);

    const month = date.getMonth() + 1;
    const day = String(date.getDate()).padStart(2, "0");
    const week = weekDays[date.getDay()];

    lastWeek.push(`${month}.${day} (${week})`);
  }

  const thisWeekTime = [170, 225, 130, 110, 150, 90, 190];

  // 가장 큰 데이터의 배경색 다르게 주기
  // 1. 가장 큰 값의 인덱스 구하기
  const maxValue = Math.max(...thisWeekTime);
  const maxIndex = thisWeekTime.indexOf(maxValue);

  // 2. 각 데이터별 색상 배열 만들기
  const backgroundColors = thisWeekTime.map((v, i) => (i === maxIndex ? "#A451F7" : "#E0C1FF"));

  const options = {
    responsive: false, // false 크기를 고정으로
    scales: {
      x: {
        min: 0,
        max: 360,
        ticks: {
          stepSize: 60,
          callback: function (value) {
            return (value = value / 60 + "h");
          },
        },
        grid: {
          color: "#999",
        },
        border: {
          width: 0,
          color: "transparent",
        },
      },
      y: {
        grid: {
          display: false,
        },
        border: {
          width: 2,
          color: "#E0C1FF",
        },
      },
    },
    plugins: {
      legend: {
        display: false, // false 범례 숨기기
      },
    },
    animation: 1000,
  };

  const config = {
    data: {
      labels: lastWeek,
      datasets: [
        {
          type: "bar",
          data: thisWeekTime,
          indexAxis: "y",
          backgroundColor: backgroundColors,
          borderRadius: 20, // 막대 끝을 둥글게
          categoryPercentage: 0.6,
          barPercentage: 0.6,
        },
      ],
    },
    options: options,
  };

  new Chart(ctx, config);
}
usageTime_chart();

// 가입 & 이탈 ####################################################

// 신규 가입 증강률
function newAccession() {
  const userSignups = document.getElementById("userSignups"),
    timeText = userSignups.querySelector("p.timeText");

  timeText.textContent = `${nowData.year}.${nowData.month}.${nowData.day} 기준`;
}
newAccession();

// 앱 탈퇴 & 휴먼계정 증감률
function userSecession_chart() {
  const ctx = document.getElementById("churnRate").querySelector("canvas").getContext("2d");

  const labels = ["1분기", "2분기", "3분기", "4분기"];
  const beforeOut_Data = [30, 40, 35, 42];
  const beforeRest_Data = [15, 56, 43, 47];
  const newOut_Data = [38, 77, 50, 60];
  const newRest_Data = [10, 63, 58, 80];
  const options = {
    responsive: false,
    maintainAspectRatio: false,
    layout: {},
    scales: {
      x: {
        offset: true, // 레이블을 축 끝에서 약간 떨어뜨림 true
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 8,
          },
        },
        border: {
          color: "#484848",
          width: 1,
        },
      },
      y: {
        offset: true,
        grid: {
          display: false,
        },
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          font: {
            size: 8,
          },
          callback: function (value) {
            return value + "%";
          },
        },
        border: {
          color: "#484848",
          width: 1,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    interaction: {
      mode: "nearest", // hover 시 가까운 데이터 요소에 반응
      intersect: false,
    },
    datasets: {
      line: {
        borderWidth: 1,
        pointRadius: 1.5,
        tension: 0.3,
      },
    },
    animation: 1000,
  };
  const config = {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          data: beforeOut_Data,
          borderColor: "#A451F7",
          pointBackgroundColor: "#A451F7",
        },
        {
          type: "line",
          data: beforeRest_Data,
          borderColor: "#A451F7",
          borderDash: [2, 3],
          pointBackgroundColor: "#fff",
        },
        {
          type: "line",
          data: newOut_Data,
          borderColor: "#FEC417",
          pointBackgroundColor: "#FEC417",
        },
        {
          type: "line",
          data: newRest_Data,
          borderColor: "#FEC417",
          borderDash: [2, 3],
          pointBackgroundColor: "#fff",
        },
      ],
    },
    options: options,
  };

  new Chart(ctx, config);
}
userSecession_chart();

// 이탈 사유
function reasonLeave_chart() {
  const ctx = document.getElementById("reasonLeave").querySelector("canvas").getContext("2d");

  const bg_yellow = "#FFF5B0";
  const bg_purple = "#F6ECFF";

  let bgColor_array = [bg_purple, bg_purple, bg_purple, bg_yellow, bg_yellow, bg_yellow, bg_yellow];

  const data = [
    { x: 30, y: 35, r: 43, name: "이용 빈도 감소" }, // "이용 빈도 감소",
    { x: 60, y: 72, r: 25, name: `무료 체험 후\n해지` }, // "무료 체험 후 해지",
    { x: 82, y: 56, r: 20, name: "가격 부담" }, // "가격 부담",
    { x: 75, y: 23, r: 35, name: "시간 부족" }, // "시간 부족",
    { x: 14, y: 72, r: 22, name: `읽고 싶은\n책 부족` }, // "읽고 싶은 책 부족",
    { x: 36, y: 72, r: 15, name: "앱 불편" }, // "앱 불편",
    { x: 60, y: 48, r: 10, name: "기타" }, // "기타",
  ];
  const options = {
    responsive: true, // 반응형(기본값 true)
    maintainAspectRatio: false, // 부모 비율에 맞게 꽉 채움
    borderColor: "transparent",
    backgroundColor: function (bgColor) {
      return bgColor_array[bgColor.dataIndex];
    },
    scales: {
      x: {
        min: 0,
        max: 100,
        display: false, // 축 전체 숨김
        grid: { display: false }, // 그리드 라인도 숨김
        ticks: {
          stepSize: 10,
        },
        font: {
          size: 0,
        },
      },
      y: {
        min: 0,
        max: 100,
        display: false, // 축 전체 숨김
        grid: { display: false }, // 그리드 라인도 숨김
        ticks: {
          stepSize: 10,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        formatter: function (value) {
          return value.name; // 각 데이터의 name 속성을 버블 안에 표시
        },
        color: "#777",
        font: {
          weight: "normal",
          size: 7,
        },
        textAlign: "center",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            // context.raw는 해당 데이터 객체를 의미합니다.
            return context.raw.name;
          },
        },
      },
    },
    interaction: {
      mode: "nearest", // hover 시 가까운 데이터 요소에 반응
      intersect: false,
    },
    animation: 1000,
  };
  const config = {
    data: {
      labels: false,
      datasets: [
        {
          type: "bubble",
          data: data,
        },
      ],
    },
    options: options,
    plugins: [ChartDataLabels],
  };

  new Chart(ctx, config);
}
reasonLeave_chart();

// 상위 독자 순위 ####################################################
function topReader() {
  const topReaders = document.getElementById("topReaders"),
    timeText = topReaders.querySelector("p.timeText");
  const bookList = topReaders.querySelector(".bookList"),
    bookList_lists = bookList.querySelectorAll("li");
  const refreshBtn = topReaders.querySelector(".data-refresh");

  // 오늘 날짜 표시
  timeText.textContent = `${nowData.year}.${nowData.month} 기준`;

  // 책 리스트 애니메이션
  bookList_lists.forEach((list, idx) =>
    list
      .querySelectorAll("span")
      .forEach(
        (span) => (
          (span.style.transform = "translateY(0)"),
          (span.style.opacity = 1),
          (span.style.transitionDelay = `${idx * 0.05}s`)
        )
      )
  );

  // 데이터 새로고침
  refreshBtn.addEventListener("click", function () {
    bookList_lists.forEach((list, idx) =>
      list
        .querySelectorAll("span")
        .forEach((span) => ((span.style.transform = "translateY(150%)"), (span.style.opacity = 0)))
    );
    setTimeout(() => {
      bookList_lists.forEach((list, idx) =>
        list
          .querySelectorAll("span")
          .forEach((span) => ((span.style.transform = "translateY(0)"), (span.style.opacity = 1)))
      );
    }, 1000);
  });
}
topReader();

// 평균 독서 시간 ####################################################
function avgReading() {
  const avgReadTime = document.getElementById("avgReadTime");
  const timeText = avgReadTime.querySelector("p.timeText");

  timeText.textContent = `1인 / ${nowData.year}.${nowData.month}.${nowData.day} (${nowData.hours}:${nowData.minutes}) 기준`;
}
avgReading();

function avgRead_chart() {
  const ctx = document.getElementById("avgReadTime").querySelector("canvas").getContext("2d");

  // tooltip 위치 조절
  Chart.Tooltip.positioners.top = function (items) {
    const pos = Chart.Tooltip.positioners.average(items);
    if (pos === false) {
      return false;
    }
    return {
      x: pos.x,
      y: pos.y - 20, // 데이터 상단에서 20px 위로
    };
  };

  const data = [
    { labels: "소설", time: 100 },
    { labels: "경제/경영", time: 63 },
    { labels: "자기계발", time: 78 },
    { labels: "시/에세이", time: 90 },
    { labels: "인문/교양", time: 84 },
    { labels: "어린이/청소년", time: 69 },
    { labels: "판타지/무협", time: 109 },
  ];
  const options = {
    responsive: false,
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          minRotation: 0,
          maxRotation: 0,
          color: "#222",
          font: {
            size: 8,
          },
        },
        border: {
          color: "#484848",
        },
      },
      y: {
        min: 0,
        max: 100,
        grid: { display: false },
        ticks: {
          stepSize: 20,
          color: "#222",
          font: {
            size: 8,
          },
          callback: function (value) {
            return value + "분";
          },
        },
        afterDataLimits(scale) {
          scale.max = scale.max * 1.15;
        },
        border: {
          color: "#484848",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true, // true 툴팁 활성화
        mode: "index", // x축 라벨 기준으로 모든 데이터셋 값 표시
        intersect: false, // false 라벨 위에만 올려도 툴팁 표시
        position: "nearest", // nearest 툴팁 위치 (기본값)
        yAlign: "none", // 툴팁 제거
        displayColors: false, // 네모 색상박스 제거
        position: "top", //

        titleAlign: "center", // 제목 중앙 정렬
        titleColor: "#222", // 제목 색상
        titleFont: {
          size: 8,
          weight: "regular",
          lineHeight: 0.5,
        },
        bodyFont: {
          size: 8,
          weight: "bold",
          lineHeight: 0.5,
        },
        bodyAlign: "center", // 본문 중앙 정렬
        bodyColor: "#9747FF", // 본문 색상

        backgroundColor: "#fff",
        borderColor: "#484848",
        borderWidth: 1,

        callbacks: {
          label: function (context) {
            // context.formattedValue는 body에 표시되는 값(문자열)
            return context.formattedValue + "분";
          },
        },
      },
    },
    animation: 1000,
  };
  const config = {
    data: {
      labels: data.map((item) => item.labels),
      datasets: [
        {
          type: "bar",
          data: data.map((item) => item.time),
          backgroundColor: "#A451F7",
          categoryPercentage: 0.4,
          barPercentage: 0.6,
        },
      ],
    },
    options: options,
  };

  new Chart(ctx, config);
}
avgRead_chart();
