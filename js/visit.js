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

  // text 콘텐츠 애니메이션
  const txtBoxs = userStatistics.querySelectorAll(".txtBox");
  txtBoxs.forEach((text) => {
    text.style.opacity = 1;
  });
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
  const ctx = document.getElementById("users-visitTime").querySelector("canvas").getContext("2d");

  // Gradient 생성
  const gradient_member = ctx.createLinearGradient(0, 0, 0, 450);
  gradient_member.addColorStop(0, "rgba(151, 71, 255, 0.3)");
  gradient_member.addColorStop(1, "rgba(255, 255, 255, 0)");

  const gradient_guest = ctx.createLinearGradient(0, 0, 0, 450);
  gradient_guest.addColorStop(0, "rgba(255, 238, 96, 1)");
  gradient_guest.addColorStop(1, "rgba(255, 238, 96, 0)");

  // 차트 border 추가 설정
  const extraBorderPlugin = {
    id: "extraBorderPlugin",
    afterDraw: (chart) => {
      const { ctx, chartArea } = chart;
      ctx.save();
      ctx.strokeStyle = "#999"; // 선 색상
      ctx.lineWidth = 0.3; // 선 두께

      // 상단(위쪽) 선
      ctx.beginPath();
      ctx.moveTo(chartArea.left, chartArea.top);
      ctx.lineTo(chartArea.right, chartArea.top);
      ctx.stroke();

      // 오른쪽(우측) 선
      // ctx.beginPath();
      // ctx.moveTo(chartArea.right, chartArea.top);
      // ctx.lineTo(chartArea.right, chartArea.bottom);
      // ctx.stroke();

      ctx.restore();
    },
  };

  const label = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "24:00",
  ];
  const memberData = [
    17300, 15600, 13500, 12800, 9000, 11500, 18800, 23700, 26200, 23700, 17400, 20800, 22500, 21800, 18500, 21300,
    22300, 23500, 24720, 26200, 28350, 29200, 28100, 26800, 22500,
  ];
  const guestData = [
    6000, 6800, 7800, 6800, 6000, 10000, 11500, 12100, 13000, 11500, 10000, 16500, 17800, 16400, 14100, 13200, 12400,
    11700, 9780, 9240, 11800, 12500, 13890, 12100, 9400,
  ];
  const memberBarData = [
    null,
    null,
    null,
    null,
    null,

    null,
    null,
    23700,
    26200,
    23700,

    null,
    null,
    null,
    null,
    null,

    null,
    null,
    null,
    null,
    null,

    null,
    null,
    null,
    null,
    null,
  ];
  const guestBarData = [
    null,
    null,
    null,
    null,
    null,

    null,
    null,
    null,
    null,
    null,

    null,
    16500,
    17800,
    16400,
    null,

    null,
    null,
    null,
    null,
    null,

    null,
    null,
    null,
    null,
    null,
  ];

  const options = {
    responsive: true, // false 크기를 고정으로
    borderWidth: 0.4,
    borderColor: "#222",
    fill: false,
    elements: {
      point: {
        // 짝수 시간만 표시
        pointBackgroundColor: label.map((label, idx, arr) => {
          const hour = parseInt(label.split(":")[0], 10);
          const isOddHour = hour % 2 !== 0;
          const isFirstOrLast = idx === 0 || idx === arr.length - 1;

          return isOddHour || isFirstOrLast ? "transparent" : "#A451F7";
        }),
        pointBorderColor: label.map((label, idx, arr) => {
          const hour = parseInt(label.split(":")[0], 10);
          const isOddHour = hour % 2 !== 0;
          const isFirstOrLast = idx === 0 || idx === arr.length - 1;

          return isOddHour || isFirstOrLast ? "transparent" : "#000";
        }),
      },
    },
    scales: {
      x: {
        // offset: false, // false 왼쪽으로 딱 붙이기
        ticks: {
          callback: function (value, idx, values) {
            // 시간 값에서 숫자 부분 추출 (예: "02:00" → 2)
            const hour = parseInt(this.getLabelForValue(value).split(":")[0], 10);
            // 짝수 시간 또는 24:00인 경우만 표시
            return hour % 2 === 0 || hour === 24 ? this.getLabelForValue(value) : "";
          },
          align: "inner",
          autoSkip: true, // 자동 줄바꿈 활성화
          maxRotation: 0, // 회전 각도 0도 설정
          minRotation: 0, // 최소 회전 각도 강제 적용
          font: { size: 10 },
        },
        border: {
          color: "#E0C1FF",
          width: 2,
        },
      },
      y: {
        min: 5000,
        max: 30000,
        ticks: {
          stepSize: 5000,
          font: { size: 10 },
        },
        afterDataLimits(scale) {
          scale.max = scale.max * 1.15; // Y축 최대값을 기존 데이터 최대값의 120%로 설정
        },
        border: {
          color: "#E0C1FF",
          width: 2,
        },
      },
    },
    plugins: {
      legend: {
        display: false, // false 범례 숨기기
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
      labels: label,
      datasets: [
        {
          label: "회원",
          type: "line",
          data: memberBarData,
          order: 3,
          fill: true,
          borderWidth: 0,
          backgroundColor: gradient_member,
        },
        {
          label: "비회원",
          type: "line",
          data: guestBarData,
          order: 3,
          fill: true,
          borderWidth: 0,
          backgroundColor: gradient_guest,
        },
        {
          type: "line",
          data: memberData,
          order: 1,
        },
        {
          type: "line",
          data: guestData,
          order: 2,
          pointBackgroundColor: label.map((label, idx, arr) => {
            const hour = parseInt(label.split(":")[0], 10);
            const isOddHour = hour % 2 !== 0;
            const isFirstOrLast = idx === 0 || idx === arr.length - 1;

            return isOddHour || isFirstOrLast ? "transparent" : "#FFEB60";
          }),
        },
      ],
    },
    options: options,
    plugins: [extraBorderPlugin],
  };

  new Chart(ctx, config);
}
usersVisitTime();
// "방문자시간 별 사용자 수" 영역에 현재 날짜/시간 표시
function usersVisit_currentTime() {
  const usersVisitTime = document.getElementById("users-visitTime");
  const currentTime = usersVisitTime.querySelector(".currentTime");

  currentTime.textContent = `${nowData.year}.${nowData.month}.${nowData.day} (${nowData.hours}:${nowData.minutes})`;
}
usersVisit_currentTime();

// 사용자 인구 통계 ####################################################
function usersDemographics() {
  const ctx = document.getElementById("users-demographics").querySelector("canvas").getContext("2d");

  const label = ["10대", "20대", "30대", "40대", "50대"];
  const maleData = [18, 24, 32, 21, 12];
  const femaleData = [22, 25, 36, 18, 5];

  const options = {
    responsive: true,
    layout: {
      padding: {
        top: 40,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          color: "#E0C1FF",
          width: 2,
        },
      },
      y: {
        min: 0,
        max: 50,
        ticks: {
          stepSize: 10,
          callback: function (value) {
            return value === 0 ? "" : value && value + "%";
          },
        },
        afterDataLimits(scale) {
          scale.max = scale.max * 1.15;
        },
        border: {
          color: "#E0C1FF",
          width: 2,
        },
      },
    },
    plugins: {
      legend: {
        display: false, // false 범례 숨기기
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
      labels: label,
      datasets: [
        {
          type: "bar",
          data: maleData,
          backgroundColor: "#A451F7",
          // barThickness: 10,
          categoryPercentage: 0.4,
          barPercentage: 0.6,
        },
        {
          type: "bar",
          data: femaleData,
          backgroundColor: "#FFEB60",
          // barThickness: 10,
          categoryPercentage: 0.4,
          barPercentage: 0.6,
        },
      ],
    },
    options: options,
  };
  new Chart(ctx, config);
}
usersDemographics();

// "사용자 인구 통계" 영역에 현재 날짜/시간 표시
function usersDemographics_currentTime() {
  const usersDemographics = document.getElementById("users-demographics");
  const currentTime = usersDemographics.querySelector(".currentTime");

  currentTime.textContent = `${nowData.year}.${nowData.month} 기준`;
}
usersDemographics_currentTime();

// 유입 경로 ####################################################
function usersTraffic_chart() {
  const ctx = document.getElementById("users-traffic").querySelector("canvas").getContext("2d");

  const usersTraffic = document.getElementById("users-traffic");
  const trfContent_labels = usersTraffic.querySelectorAll(".labels");

  const labels = ["책소개 카드뉴스", "SNS 이벤트", "광고"];
  const datas = [];
  const bgColor = ["#EDEDED", "#E0C1FF", "#FFF298"];

  trfContent_labels.forEach((label, idx) => {
    let label_data = label.getAttribute("data-trfContent");
    datas.push(label_data);
  });

  const options = {
    responsive: false,
    radius: 70,
    borderWidth: 0,
    fill: false,
    backgroundColor: bgColor,
    interaction: {
      mode: "nearest",
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    animation: {
      animateRotate: true, // 처음에 회전하면서 생성
      animateScale: true, // 처음에 커지면서 생성
      duration: 1000, // 애니메이션 지속 시간
    },
  };

  const config = {
    data: {
      datasets: [
        {
          label: false,
          type: "pie",
          data: datas,
        },
      ],
    },
    options: options,
  };

  new Chart(ctx, config);
}
usersTraffic_chart();

// "유입 경로" 퍼센트 표시
function usersTraffic_percent() {
  const perBarDatas = document.querySelectorAll(".perBar_wrap");
  const perBars = document.querySelectorAll(".perBar");
  const perNums = document.querySelectorAll(".per_num");
  const labels = document.querySelectorAll(".labels");
  const label_perNums = document.querySelectorAll(".label_perNum");

  perBarDatas.forEach((data, idx) => {
    let perData = data.getAttribute("data-trafficPer");

    perBars[idx].style.width = `${perData}%`;
    perNums[idx].style.left = `${perData}%`;
    perNums[idx].style.opacity = 1;
    perNums[idx].textContent = `${perData}%`;
  });

  labels.forEach((label, idx) => {
    let label_data = label.getAttribute("data-trfContent");

    labels[idx].style.opacity = 1;
    label_perNums[idx].textContent = `${label_data}%`;
  });
}
usersTraffic_percent();

// "유입 경로" 영역에 현재 날짜/시간 표시
function usersTraffic_currentTime() {
  const usersTraffic = document.getElementById("users-traffic");
  const currentTime = usersTraffic.querySelector(".currentTime");

  currentTime.textContent = `${nowData.year}.${nowData.month} 기준`;
}
usersTraffic_currentTime();
