// 이용현황 ####################################################
function usageStatus() {
  // 데이터 준비
  const data = {
    labels: ["", "1.05", "1.06", "1.07", "1.08", "1.09", "1.10", "1.11", " "], // X축 값
    datasets: [
      {
        label: "", //데이터 세트가 무엇을 의미하는지
        data: [500000, 700000, 500000, 600000, 500000, 800000, 600000, 793250, 793250], // Y축 값
        borderWidth: 1,
        borderColor: "#a451f7", // 선 색상
        backgroundColor: "transparent",
        fill: false, // 선 아래 영역을 채울지 여부
        tension: 0.5, // 선의 곡률 조정
      },
    ], //datasets
  }; // data

  // 그래프 설정
  const config = {
    type: "line", // 그래프 유형
    data: data,
    options: {
      interaction: {
        mode: "index", // X축 인덱스를 기준으로 툴팁 표시
        intersect: false, // 교차하지 않아도 툴팁 표시
      },

      scales: {
        x: {
          offset: false, // 레이블을 축 끝에서 약간 떨어뜨림 true
          beginAtZero: true,
          min: 0, // X축 최소값 설정
          max: " ",
          ticks: {
            padding: 0, // 레이블과 축 사이의 간격 설정
            font: {
              size: 10,
            },
            color: "#222",
          },
          grid: {
            display: true, // 격자선 표시 여부
            lineWidth: function (context) {
              if (context.index === 0) {
                return "2";
              }
              return "false";
            },
            color: "#E0C1FF",
          },
        },
        y: {
          offset: 0,
          beginAtZero: true,
          min: 0,
          max: 1000000,
          ticks: {
            stepSize: 200000,
            font: {
              size: 10,
            },
            color: "#222",
          },
          grid: {
            display: true,
            lineWidth: function (context) {
              if (context.index === 0) {
                return "2";
              }
              return "0.5";
            },
            color: function (context) {
              if (context.index === 0) {
                return "#E0C1FF"; // 0번째 라벨 색상 변경
              }
              return "#999"; // 나머지 라벨 색상 유지
            },
          },
          afterDataLimits(scale) {
            scale.max = scale.max * 1.2; // Y축 최대값을 기존 데이터 최대값의 120%로 설정
          },
        },
      },
      elements: {
        point: {
          pointRadius: 1,
          pointHoverRadius: 5,
          pointBackgroundColor: "transparent",
          pointBorderColor: "transparent",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#A451F7",
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false, // 차트 제목 보이기 여부
        },
        tooltip: {
          mode: "index",
          titleAlign: "center", // 제목 중앙 정렬
          bodyAlign: "center", // 본문 중앙 정렬
          footerAlign: "center", // 바닥글 중앙 정렬 (필요한 경우)
          
          position: "average", // 툴팁이 데이터 포인트의 중심 위에 표시
          yAlign: "bottom", // 툴팁을 아래쪽에 표시
          callbacks: {
            title(tooltipItems) {
              const label = tooltipItems[0].label; // 첫 번째 tooltipItem의 레이블
              const date = new Date(`2025-${label}`);
              const options = { month: "long", day: "2-digit", weekday: "short" };
              return date.toLocaleDateString("ko-KR", options); // 날짜 형식 변환
            },
          },
          backgroundColor: "#E0C1FF",
          titleColor: "#333",
          bodyColor: "#333",
          borderColor: "#9747FF",
          borderWidth: 1,
          padding: 10,
          displayColors: false,
          titleFont:{
            weight:"normal",
          },
          font:{
            weight:"normal",
          },
        },
      },
      animation: {
        duration: 1000, // 애니메이션 지속 시간 설정
      },
    },
  }; // config
  // 그래프 그리기
  const ctx = document.getElementById("usage-Status").querySelector("canvas").getContext("2d");
  const usageStatus_chart = new Chart(ctx, config);
}

// 실시간 인기도서 ####################################################
// 새로고침하면 인기도서 순위 변경
function shuffleRank() {
  const popular_Books = document.getElementById("popular-Books"); // 실시간 인기도서 영역
  const popularList = popular_Books.querySelector("ol#popular-Books-list"); // 실시간 인기도서 리스트
  const popularList_Elems = popularList.querySelectorAll("li"); //
  const popularList_shuffleButton = popular_Books.querySelector(".data-refresh"); // 실시간 인기도서 새로고침 버튼

  // 인기 도서 리스트 TOP8
  let popularList_Array = [
    {
      id: 0,
      bookName: "무의식은 어떻게 나를 설계하는가",
      nowRank: "3",
      transRank: "rank-Up",
    },
    {
      id: 1,
      bookName: "하루 한 장, 작지만 큰 변화의 힘",
      nowRank: "1",
      transRank: "rank-Down",
    },
    {
      id: 2,
      bookName: "고전이 답했다 마땅히 살아야 할 삶에 대하여",
      nowRank: "3",
      transRank: "rank-Up",
    },
    {
      id: 3,
      bookName: "트렌드 코리아 2025",
      nowRank: "3",
      transRank: "rank-Up",
    },
    {
      id: 4,
      bookName: "어른의 행복은 조용하다",
      nowRank: "2",
      transRank: "rank-Down",
    },
    {
      id: 5,
      bookName: "이처럼 사소한 것들",
      nowRank: "6",
      transRank: "rank-Up",
    },
    {
      id: 6,
      bookName: "돌이킬 수 있는",
      nowRank: "New",
      transRank: "New-rank",
    },
    {
      id: 7,
      bookName: "B주류 경제학",
      nowRank: "1",
      transRank: "rank-Hold",
    },
  ];

  // 인기도서 기본 순위
  function popularList_default() {
    popularList_Elems.forEach((popularList_Elem, idx) => {
      let bookName = popularList_Elem.querySelector(".book_name");
      let bookRank = popularList_Elem.querySelector(".books_nowRank");

      bookName.style.transition = `${0}s`;
      bookName.style.transitionDelay = `${0}s`;
      bookName.style.opacity = "0";
      bookName.style.transform = "translateY(20px)";

      bookRank.style.transition = `${0}s`;
      bookRank.style.transitionDelay = `${0}s`;
      bookRank.style.opacity = "0";
      bookRank.style.transform = "translateY(20px)";
    });
  }

  // 인기도서 올라오는 애니메이션
  function popularList_upAni() {
    popularList_Elems.forEach((popularList_Elem, idx) => {
      let bookName = popularList_Elem.querySelector(".book_name");
      let bookRank = popularList_Elem.querySelector(".books_nowRank");

      bookName.style.transition = `${0.75}s`;
      bookName.style.transitionDelay = `${0.1 * idx}s`;
      bookName.style.opacity = "1";
      bookName.style.transform = "translateY(0)";

      bookRank.style.transition = `${0.75}s`;
      bookRank.style.transitionDelay = `${0.1 * idx}s`;
      bookRank.style.opacity = "1";
      bookRank.style.transform = "translateY(0)";
    });
  }
  popularList_upAni();

  // 인기도서 요소에 데이터 입력
  function populateList() {
    // 인기도서 순위 랜덤
    for (let i = popularList_Array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [popularList_Array[i], popularList_Array[j]] = [popularList_Array[j], popularList_Array[i]];
    }

    function getRandomRankStatus() {
      const statuses = ["rank-Up", "rank-Down", "New-rank", "rank-Hold"];
      const randomIndex = Math.floor(Math.random() * 3) + 1;
      return statuses[randomIndex];
    }
    // 인기도서 책제목, 순위 입력하기
    popularList_Elems.forEach((popularList_Elem, idx) => {
      popularList_Elem.querySelector(".book_name").textContent = `${popularList_Array[idx].bookName}`;
      // 랭크 유형을 가져와 변화후 재적용
      popularList_Elem.querySelector(".books_nowRank").setAttribute("data-transRank", getRandomRankStatus());
      let rankStatus = popularList_Elem.querySelector(".books_nowRank").getAttribute("data-transRank");

      // 변화된 랭크 유형을 가져와 유형에 따라 다른 요소 넣기
      switch (rankStatus) {
        case "rank-Up":
        case "rank-Down":
          popularList_Array[idx].nowRank = Math.floor(Math.random() * 2) + 1;
          popularList_Array[idx].nowRank = -popularList_Array[idx].nowRank;
          break;
        case "New-rank":
          popularList_Array[idx].nowRank = "New";
          break;
        case "rank-Hold":
        default:
          popularList_Array[idx].nowRank = "ㅡ";
          break;
      }

      let displayRank = popularList_Array[idx].nowRank;
      // if (typeof displayRank === "number" && displayRank > 0) {
      //   displayRank = `+${displayRank}`;
      // }

      popularList_Elem.querySelector(".books_nowRank").textContent = `${displayRank}`;
    });
  }
  populateList();

  // 새로고침시 실행할 함수
  function shuffleAndCompare() {
    popularList_default(); // 리스트 애니메이션 초기화
    populateList(); // 순위 변경
    setTimeout(popularList_upAni, 750); // 리스트 애니메이션
  }
  // 새로고침 버튼 누르면 업데이트
  popularList_shuffleButton.addEventListener("click", shuffleAndCompare);
}

// #######################################

usageStatus(); //#이용현황
shuffleRank(); //#실시간 인기도서
//#데일리
//#유입경로
//#콘텐츠 이용비율
//#문의
