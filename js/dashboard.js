// 데이터 준비
const data = {
  labels: ["January", "February", "March", "April", "May", "June"], // X축 값
  datasets: [
    {
      label: "Sales Over Time", //데이터 세트가 무엇을 의미하는지
      data: [25, 50, 3, 5, 20, 3], // Y축 값
      borderColor: "rgba(75, 192, 192, 1)", // 선 색상
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      fill: true, // 선 아래 영역을 채울지 여부
      tension: 0.1, // 선의 곡률 조정
    },
  ], //datasets
}; // data

// 그래프 설정
const config = {
  type: "bar", // 그래프 유형 line, bar, pie, doughnut, radar, scatter, bubble, mixed
  data: data,
  options: {
    scales: {
      x: {
        position: "bottom", // X축을 하단에 배치
        grid: {
          // 격자선 설정
          display: true, // 격자선 표시 여부
          color: "rgba(0, 0, 0, 0.1)", // 격자선 색상
          lineWidth: 1, // 격자선 두께
        },
      },
      y: {
        position: "left", // Y축을 왼쪽에 배치
        beginAtZero: true, // Y축이 0부터 시작
        min: 0, // Y축의 최소값을 0으로 설정
        max: 100, // Y축의 최대값을 100으로 설정
        ticks: {
          // 축의 눈금 설정정
          stepSize: 10, // 눈금 간격을 10으로 설정
          font: {
            size: 14, // 글꼴 크기 설정
            family: "Arial", // 글꼴 패밀리 설정
          },
          color: "rgba(75, 192, 192, 1)", // 눈금 글꼴 색상
        },
      },
      y2: {
        type: "linear", // 선형 Y축
        position: "right", // 오른쪽 Y축
        beginAtZero: true,
        grid: {
          drawOnChartArea: false, // 오른쪽 Y축에는 격자선 표시 안 함
        },
      },
    }, // scales

    responsive: true, // 화면 크기 변경 시 차트 크기 자동 조정 (true)
    maintainAspectRatio: false, // 비율을 유지하지 않음 (false)

    animation: {
      duration: 1000, // 애니메이션 지속 시간
    }, // animation

    plugins: {
      legend: {
        position: "bottom", // 범례(데이터 설명) 위치 top, right, bottom, left
        labels: {
          font: {
            size: 14, // 글꼴 크기
            weight: "bold", // 글꼴 두께
            family: "Arial", // 글꼴 패밀리
          }, //font
          color: "rgba(0, 0, 0, 0.7)", // 글꼴 색상
        }, //labels
      }, //legend

      // title: {
      //   // 차트의 제목 (차트가 무엇을 나타내는지, 차트 상단에 표시)
      //   display: true,
      //   text: "Sales Over Time",
      //   font: {
      //     size: 18, // 글꼴 크기
      //     weight: "bold", // 글꼴 두께
      //     family: "Arial", // 글꼴 패밀리
      //   }, //font
      //   color: "rgba(0, 0, 0, 0.8)", // 글꼴 색상
      //   padding: {
      //     top: 20, // 제목 위 여백
      //     bottom: 20, // 제목 아래 여백
      //   }, //padding
      // }, //title
    }, //plugins
  }, //options
}; // config

// 그래프 그리기
const ctx = document.getElementById("usage-Status").querySelector("canvas").getContext("2d");
const myLineChart = new Chart(ctx, config);
