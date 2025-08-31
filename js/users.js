import { nowData } from "./common.js";
import { division } from "./usersData.js";

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

/*
division ={
    holric
    milliePic
    hidden
    mania
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

  // tooltip 위치 조절
  Chart.Tooltip.positioners.nearest = function (items) {
    const pos = Chart.Tooltip.positioners.average(items);
    if (pos === false) {
      return false;
    }
    return {
      x: pos.x,
      y: pos.y - 30, // 데이터 상단에서 30px 위로
    };
  };

  const labels = ["1분기", "2분기", "3분기", "4분기"];
  const beforeOut_Data = [30, 40, 35, 42];
  const beforeRest_Data = [15, 56, 43, 47];
  const newOut_Data = [38, 77, 50, 60];
  const newRest_Data = [10, 63, 58, 80];
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 20,
      },
    },
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
      tooltip: {
        mode: "nearest", // 툴팁 표시도 가장 가까운 데이터만
        displayColors: true, // false 네모 색상박스 제거
        usePointStyle: true, // pointStyle 적용
        yAlign: "none",
        position: "nearest",
        // position: "top",

        bodyAlign: "center", // 본문 중앙 정렬
        borderWidth: 0.5,
        borderColor: "#222",
        backgroundColor: "#fff",

        padding: {
          top: 5,
          left: 15,
          bottom: 5,
          right: 15,
        },
        titleAlign: "center", // 제목 중앙 정렬
        titleColor: "#777",
        titleFont: {
          weight: "normal",
          size: 6,
          lineHeight: .5,
        },

        bodyColor: "#222",
        bodyFont: {
          size: 6,
        },

        callbacks: {
          title: function (tooltipItems) {
            const currentYear = new Date().getFullYear(); // 현재 연도 가져오기 (예: 2025)
            const idx = tooltipItems[0].dataIndex; // 툴팁 대상 데이터 인덱스
            const quarterLabel = labels[idx]; // ["1분기", "2분기", ...]에서 분기명 가져오기
            return `${currentYear}년 ${quarterLabel}`; // 예: "2025년 2분기"
          },
          label: function (tooltipItem) {
            let value = "";
            let dataValue = 0;

            if (tooltipItem.datasetIndex === 0) {
              value = "기존 탈퇴";
              dataValue = beforeOut_Data[tooltipItem.dataIndex];
            } else if (tooltipItem.datasetIndex === 1) {
              value = "기존 휴면게정";
              dataValue = beforeRest_Data[tooltipItem.dataIndex];
            } else if (tooltipItem.datasetIndex === 2) {
              value = "신규 탈퇴";
              dataValue = newOut_Data[tooltipItem.dataIndex];
            } else if (tooltipItem.datasetIndex === 3) {
              value = "신규 휴면계정";
              dataValue = newRest_Data[tooltipItem.dataIndex];
            }
            return [" " + value, dataValue + "%"];
          },
        },
      },
    },
    interaction: {
      mode: "nearest", // hover 시 가까운 데이터 요소에 반응
      intersect: false,
    },
    datasets: {
      line: {
        borderWidth: 1,
        pointRadius: 1.5, // 각 데이터셋의 포인트 기본 크기
        tension: 0.3,
      },
    },
    elements: {
      point: {
        hoverRadius: 1.5, // hover 시 포인트 크기
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
      list.querySelectorAll("span").forEach((span) => {
        span.style.transform = "translateY(150%)";
        span.style.opacity = 0;
      })
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
  const refreshBtn = avgReadTime.querySelector(".data-refresh");

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

// 완독지수 ####################################################
function completedReaders_chart() {
  const ctx = document.getElementById("completedReaders").querySelector("canvas").getContext("2d");

  let hoveredArea = null;
  const data = [
    // 1사분면 (왼쪽 위)
    { x: -13, y: 8 },
    { x: -15, y: 10 },
    { x: -10, y: 5 },
    { x: -17, y: 5 },
    { x: -8, y: 15 },
    // 2사분면 (오른쪽 위)
    { x: 3, y: 5 },
    { x: 5, y: 10 },
    { x: 7, y: 7 },
    { x: 10, y: 3 },
    { x: 15, y: 8 },
    // 3사분면 (왼쪽 아래)
    { x: -5, y: -5 },
    { x: -17, y: -9 },
    { x: -14, y: -12 },
    { x: -11, y: -15 },
    { x: -10, y: -11 },
    // 4사분면 (오른쪽 아래)
    { x: 5, y: -5 },
    { x: 7, y: -17 },
    { x: 10, y: -7 },
    { x: 16, y: -13 },
    { x: 17, y: -4 },
  ];
  const options = {
    responsive: false,
    // maintainAspectRatio: true, //(기본): 비율 유지
    backgroundColor: "transparent",
    elements: {
      point: {
        radius: 2, // 기본 점 크기
        hoverRadius: 2, // 호버 시 점 크기
        hoverBackgroundColor: "#A451F7",
      },
    },
    borderWidth: 1,
    borderColor: "#A451F7",
    scales: {
      x: {
        title: {
          display: true,
          text: "완독 예상 시간(분)",
          color: "#777",
          font: {
            size: 8,
          },
        },
        grid: {
          display: false,
        },
        min: -20,
        max: 20,
        border: {
          display: false, // false y축 제거
        },
        ticks: {
          callback: function (value) {
            if (value == -20) return "낮음";
            if (value == 20) return "높음";
            return "";
          },
          font: { size: 8 },
          color: "#777",
          padding: -5,
          align: "end", // 'start', 'center', 'end' 중 선택
          crossAlign: "near", // 'near', 'center', 'far' 중 선택
        },
      },
      y: {
        title: {
          display: true,
          text: "완독할 확률(%)",
          color: "#777",
          font: {
            size: 8,
          },
        },
        grid: { display: false },
        min: -20,
        max: 20,
        border: {
          display: false, // false y축 제거
        },
        ticks: {
          callback: function (value) {
            return value == 20 ? "높음" : "";
          },
          font: { size: 8 },
          padding: -10,
          color: "#777",
          align: "start", // 'start', 'center', 'end' 중 선택
          crossAlign: "far", // 'near', 'center', 'far' 중 선택
        },
      },
    },
    onHover: (event, elements, chart) => {
      if (elements.length > 0) {
        // hover된 포인트의 데이터값(x, y) 가져오기
        const datasetIndex = elements[0].datasetIndex;
        const index = elements[0].index;
        const point = chart.data.datasets[datasetIndex].data[index];
        // 사분면 판별 (여기서는 x, y=0 기준)
        if (point.x < 0 && point.y > 0) hoveredArea = 1;
        else if (point.x >= 0 && point.y > 0) hoveredArea = 2;
        else if (point.x < 0 && point.y <= 0) hoveredArea = 3;
        else hoveredArea = 4;
      } else {
        hoveredArea = null;
      }
      chart.draw(); // 차트 다시 그리기
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false, // 기본 툴팁 비활성화
        external: function (context) {
          // 1. 툴팁 엘리먼트 준비
          let tooltipEl = document.getElementById("chartjs-tooltip");

          if (!tooltipEl) {
            tooltipEl = document.createElement("div");
            tooltipEl.id = "chartjs-tooltip";
            tooltipEl.style.position = "absolute";
            tooltipEl.style.pointerEvents = "none";
            document.body.appendChild(tooltipEl);
          }

          // 2. 툴팁 숨김 처리
          const tooltipModel = context.tooltip;
          if (tooltipModel.opacity === 0) {
            tooltipEl.style.opacity = 0;
            return;
          }

          // 3. 데이터 추출
          const dataIndex = tooltipModel.dataPoints?.[0]?.dataIndex;
          let areaName = ""; // 예: 'holric'

          switch (hoveredArea) {
            case 1:
              areaName = "holric";
              break;
            case 2:
              areaName = "milliePic";
              break;
            case 3:
              areaName = "hidden";
              break;
            case 4:
              areaName = "mania";
              break;
          }
          const obj = division[areaName][dataIndex % 5];
          const imgUrl = `./images/users/bookList/${obj.bookCover_url}.png`;

          // 4. HTML 생성
          tooltipEl.innerHTML = `
          <div style="background:#fff; border:0.5px solid #484848; border-radius:3px; padding:10px 12px;">
            <img src="${imgUrl}" style="width:30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.2);">
          </div>
        `;

          // 5. 위치 조정
          const position = context.chart.canvas.getBoundingClientRect();
          tooltipEl.style.opacity = 1;
          tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + "px";
          tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + "px";
          tooltipEl.style.transform = "translate(-50%, -105%)";

          // 6. 책정보 표시
          const completedReadElem = document.getElementById("completedReaders"),
            bookNameElem = completedReadElem.querySelector(".bookName"),
            bookCateElem = completedReadElem.querySelector(".bookCategory"),
            completPer = completedReadElem.querySelector(".completPer"),
            completTime = completedReadElem.querySelector(".completTime");
          bookNameElem.textContent = `${obj.bookName}`;
          bookCateElem.textContent = `${obj.category}`;
          ["up", "down"].forEach((clss) => {
            completPer.classList.remove(clss);
            completTime.classList.remove(clss);
          });
          completPer.classList.add(obj.completPer_than);
          completTime.classList.add(obj.completTime_than);
          completPer.querySelector(".dataTitle .data").textContent = `${obj.completPer}`;
          completTime.querySelector(".dataTitle .data").textContent = `${obj.completTime}`;
          completPer.querySelector(".thanAverage .data").textContent = `${obj.completPer_Avg}`;
          completTime.querySelector(".thanAverage .data").textContent = `${obj.completTime_Avg}`;
        },
      },
    },
    interaction: {
      mode: "nearest", // hover 시 가까운 데이터 요소에 반응
      intersect: false,
    },
    animation: {
      duration: 1000, // 애니메이션 지속 시간 설정
    },
  };
  // 차트 사등분 하기
  const onHoverBackground = {
    id: "bgColorArea", // 플러그인 고유 id
    beforeDraw(chart) {
      // 차트가 그려지기 전에 실행
      const {
        ctx, // canvas 2D
        chartArea: { left, top, width, height }, // 차트 영역 선택
      } = chart;
      ctx.save(); // 현재 캔버스 상태 저장

      const halfWidth = width / 2;
      const halfHeight = height / 2;

      // 각 사분면별로 hover 상태에 따라 배경색 결정
      const areaColors = [
        hoveredArea === 1 ? "#F9F3FF" : "#fff", // 1사분면 (왼쪽 위)
        hoveredArea === 2 ? "#F9F3FF" : "#fff", // 2사분면 (오른쪽 위)
        hoveredArea === 3 ? "#F9F3FF" : "#fff", // 3사분면 (왼쪽 아래)
        hoveredArea === 4 ? "#F9F3FF" : "#fff", // 4사분면 (오른쪽 아래)
      ];
      const textColors = [
        hoveredArea === 1 ? "#D2AEFF" : "#C9C9C9", // 1사분면 (왼쪽 위)
        hoveredArea === 2 ? "#D2AEFF" : "#C9C9C9", // 2사분면 (오른쪽 위)
        hoveredArea === 3 ? "#D2AEFF" : "#C9C9C9", // 3사분면 (왼쪽 아래)
        hoveredArea === 4 ? "#D2AEFF" : "#C9C9C9", // 4사분면 (오른쪽 아래)
      ];

      // 1사분면 (왼쪽 위)
      ctx.fillStyle = areaColors[0];
      ctx.fillRect(left, top, halfWidth, halfHeight);
      ctx.strokeStyle = "#222"; // 원하는 border 색상
      ctx.lineWidth = 0.5; // 원하는 border 두께
      ctx.strokeRect(left, top, halfWidth, halfHeight);
      // 글자 스타일 설정
      ctx.font = "800 20px Pretendard-R"; // 폰트 크기와 종류
      ctx.fillStyle = textColors[0]; // 글자 색상
      ctx.textAlign = "start"; // 가운데 정렬
      ctx.textBaseline = "middle"; // 세로 중앙 정렬
      // 사각형 중앙 좌표 계산
      let centerX = left + 15;
      let centerY = top + 20;
      // 글자 출력
      ctx.fillText("홀릭", centerX, centerY);

      // 2사분면 (오른쪽 위)
      ctx.fillStyle = areaColors[1];
      ctx.fillRect(left + halfWidth, top, halfWidth, halfHeight);
      ctx.strokeRect(left + halfWidth, top, halfWidth, halfHeight);
      ctx.font = "800 20px Pretendard-R"; // 폰트 크기와 종류
      ctx.fillStyle = textColors[1]; // 글자 색상
      ctx.textAlign = "end"; // 가운데 정렬
      ctx.textBaseline = "middle"; // 세로 중앙 정렬
      centerX = left + halfWidth * 2 - 15;
      centerY = top + 20;
      ctx.fillText("밀리 픽", centerX, centerY);

      // 3사분면 (왼쪽 아래)
      ctx.fillStyle = areaColors[2];
      ctx.fillRect(left, top + halfHeight, halfWidth, halfHeight);
      ctx.strokeRect(left, top + halfHeight, halfWidth, halfHeight);
      ctx.font = "800 20px Pretendard-R"; // 폰트 크기와 종류
      ctx.fillStyle = textColors[2]; // 글자 색상
      ctx.textAlign = "start"; // 가운데 정렬
      ctx.textBaseline = "middle"; // 세로 중앙 정렬
      centerX = left + 15;
      centerY = top + halfWidth + 40;
      ctx.fillText("히든", centerX, centerY);

      // 4사분면 (오른쪽 아래)
      ctx.fillStyle = areaColors[3];
      ctx.fillRect(left + halfWidth, top + halfHeight, halfWidth, halfHeight);
      ctx.strokeRect(left + halfWidth, top + halfHeight, halfWidth, halfHeight);
      ctx.font = "800 20px Pretendard-R"; // 폰트 크기와 종류
      ctx.fillStyle = textColors[3]; // 글자 색상
      ctx.textAlign = "end"; // 가운데 정렬
      ctx.textBaseline = "middle"; // 세로 중앙 정렬
      centerX = left + halfWidth * 2 - 15;
      centerY = top + halfWidth + 40;
      ctx.fillText("마니아", centerX, centerY);

      ctx.restore(); // 이전 캔버스 상태로 복원 (다른 그리기 작업에 영향 방지)
    },
  };

  const config = {
    type: "scatter",
    data: {
      datasets: [
        {
          data: data,
        },
      ],
    },
    options: options,
    plugins: [onHoverBackground],
  };

  new Chart(ctx, config);
}
completedReaders_chart();
