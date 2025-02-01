import { usageStatus_Data, trafficSource_Data, popularList_Array, inquiryData } from "./dashboardData.js";

// 이용현황 ####################################################
function usageStatus() {
  // 데이터 준비
  const data = {
    labels: usageStatus_Data.labels, // X축 값 : 기간
    datasets: [
      {
        label: "", //데이터 세트가 무엇을 의미하는지
        data: usageStatus_Data.datasets, // Y축 값 : 이용자
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
          pointHoverRadius: 3,
          pointBackgroundColor: "transparent",
          pointBorderColor: "transparent",
          // hover시 스타일 변화
          pointHoverBorderWidth: 2,
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
          callbacks: {
            title(tooltipItems) {
              const label = tooltipItems[0].label; // 첫 번째 tooltipItem의 레이블
              const date = new Date(`2025-${label}`);
              const options = { month: "long", day: "2-digit", weekday: "short" };
              return date.toLocaleDateString("ko-KR", options); // 날짜 형식 변환
            },
            label(tooltipItem) {
              if (data.labels[tooltipItem.dataIndex] === "") {
                return ""; // 레이블이 빈 문자열인 경우 본문도 숨김
              }
              return tooltipItem.dataset.label + tooltipItem.raw; // 기본 본문 반환
            },
          },
          mode: "index",
          titleAlign: "center", // 제목 중앙 정렬
          bodyAlign: "center", // 본문 중앙 정렬
          footerAlign: "center", // 바닥글 중앙 정렬 (필요한 경우)

          position: "nearest", // 툴팁이 데이터 포인트의 중심 위에 표시 (average 또는 nearest)
          yAlign: "bottom", // 툴팁을 아래쪽에 표시
          backgroundColor: "rgba(224, 193, 255, 0.5)",
          titleColor: "#333",
          bodyColor: "#333",
          borderColor: "#9747FF",
          borderWidth: 1,
          padding: 10,
          displayColors: false,
          titleFont: {
            weight: "normal",
          },
          font: {
            weight: "normal",
          },
        },
      },
      animation: {
        duration: 1000, // 애니메이션 지속 시간 설정
      },
    },
  }; // config

  // 그래프 그리기
  const usageStatus_ctx = document.getElementById("usage-Status").querySelector("canvas").getContext("2d");
  const usageStatus_chart = new Chart(usageStatus_ctx, config);

  // 주간 || 월간 토글버튼
  const periodSelect = document.getElementById("period_Select");
  const periodBtns = periodSelect.querySelectorAll(".period_Btn");
  periodBtns.forEach((periodBtn) => {
    periodBtn.addEventListener("click", function () {
      for (btn of periodBtns) {
        btn.classList.remove("active");
      }
      this.classList.add("active");
    });
  });
  // 기간 선택 버튼
  const timeFrame = document.getElementById("timeFrame_wrap");
  const timeFrame_btn = timeFrame.querySelectorAll(".timeFrame_btn");
  const timeFrame_list = timeFrame.querySelector(".timeFrame_list");
  const list_width = 145; // 리스트 하나의 너비 = 움직일 거리
  const timeFrame_totalList = timeFrame_list.querySelectorAll("li").length - 1;
  let timeFrame_idx = 0; // 현재 보이는 리스트
  timeFrame_btn.forEach((btn) => {
    btn.addEventListener("click", function () {
      let toggle = this.getAttribute("data-toggle"); // 무슨 버튼 눌렀는지 data- 가져오기
      if (toggle == "prev") {
        if (timeFrame_idx >= 0) {
          timeFrame_idx--; // 왼쪽으로 이동
        }
      } else if (toggle == "next") {
        if (timeFrame_idx < timeFrame_totalList - 1) {
          timeFrame_idx++; // 오른쪽으로 이동
        }
      }
      timeFrame_list.style.transform = `translateX(${-timeFrame_idx * list_width}px)`; // 실제 리스트 움직임
    });
  });
}

// 데일리 ####################################################
function dailyInformation() {
  // 현재시간 화면에 구현 #datetime

  const dailyInform = document.getElementById("dailyinform");
  const dailyInform_shuffleButton = dailyInform.querySelector(".data-refresh"); // 문의 새로고침 버튼

  const users_info = document.getElementById("usersCount"); // 이용자수
  const averageTime_info = document.getElementById("averageTime"); // 평균 사용시간
  const newUser_info = document.getElementById("newUser"); // 신규 가입자

  const dataWraps = document.querySelectorAll(".dataWrap"); // 종류별 데이터 영역

  let beforeData_array = [777682, 168, 5033];
  let thanData_array = [15568, 37, 345];
  let trueData_array = [];
  // trueData_array에 초기값 적용
  beforeData_array.forEach((beforeData, idx) => {
    trueData_array.push(beforeData_array[idx] + thanData_array[idx]);
  });

  // 호출하면 데일리영역에 데이터 계산해서 적용
  function dailyArea_DataPush() {
    dataWraps.forEach((dataWrap, idx) => {
      let trueData = dataWrap.querySelector(".trueData");
      let thanData = dataWrap.querySelector(".thanData");

      let type = trueData.getAttribute("data-type");
      let trueData_result = null; // 데이터 type에따라 다른형식으로 출력
      let thanData_result = null;
      let per = Math.round((thanData_array[idx] / trueData_array[idx]) * 100);

      switch (type) {
        case "user":
          trueData_result = Number(trueData_array[idx]).toLocaleString() + "명"; // 세자리마다 , 표시
          thanData_result = `${thanData_array[idx]}명 (${per}%)`;
          break;
        case "time":
          // 현재 시간 표시
          let true_hour = Math.floor(trueData_array[idx] / 60);
          let true_min = trueData_array[idx] % 60;
          // 시,분 표시 또는 분만 표시
          if (true_hour > 0) {
            trueData_result = `${true_hour}시 ${true_min}분`;
          } else {
            trueData_result = `${true_min}분`;
          }

          // 비교 시간 표시
          let than_hour = Math.floor(thanData_array[idx] / 60);
          let than_min = thanData_array[idx] % 60;
          // 시,분 표시 또는 분만 표시
          if (than_hour > 0) {
            thanData_result = `${than_hour}시 ${than_min}분 (${per}%)`;
          } else {
            thanData_result = `${than_min}분 (${per}%)`;
          }
          break;
        default:
          return;
      }

      trueData.textContent = trueData_result; // 현재값 적용
      thanData.textContent = thanData_result; // 비교값 적용
      thanData.setAttribute("data-than", "up");
    });
  }
  dailyArea_DataPush(); // 초기 실행

  function shuffleDailyInform() {
    // 비교값을 업데이트 (+랜덤 양수)
    thanData_array = thanData_array.map((thanData, idx) => {
      let plusData = parseInt(Math.random() * 10) * 5;
      // console.log(plusData)
      let shuffleData = thanData + plusData;

      return shuffleData;
    });

    // 이전값 + 비교값 = 현재값으로 업데이트
    trueData_array = trueData_array.map((trueData, idx) => {
      let afterData = beforeData_array[idx] + thanData_array[idx];

      return afterData;
    });
    dailyArea_DataPush(); // 정보 업데이트
  }

  dailyInform_shuffleButton.addEventListener("click", shuffleDailyInform);
}

// 유입경로 ####################################################
function trafficSource() {
  const trafficSource = document.getElementById("trafficSource");
  const trafficGraphs = trafficSource.querySelectorAll(".trafficGraph");
  const trafficBrowser = trafficSource.querySelector(".trafficSearch");
  const trafficBrowser_list = trafficBrowser.querySelectorAll("li");
  const trafficSocial = trafficSource.querySelector(".trafficSNS");
  const trafficSocial_list = trafficSocial.querySelectorAll("li");
  const traffic_dataWrap = trafficSource.querySelectorAll(".data_wrap");

  // 데이터 전체 값구하기
  function calculateTotal(obj) {
    return Object.values(obj).reduce((sum, value) => sum + value, 0);
  }
  // 전체 데이터에서 퍼센트로 반환
  function calculate_Percentages(obj) {
    const total = calculateTotal(obj);
    return Object.entries(obj).reduce((result, [key, value]) => {
      result[key] = ((value / total) * 100).toFixed(2);
      return result;
    }, {});
  }

  // 브라우저 유입 퍼센트값
  const browserType_Percentages = calculate_Percentages(trafficSource_Data.browserType);
  // sns 유입 퍼센트값
  const socialType_Percentages = calculate_Percentages(trafficSource_Data.socialType);

  // dom에 있는 list : width에 퍼센트 값 넘겨주기
  // 브라우저 유입에 width전달
  trafficBrowser_list.forEach((browserList, index) => {
    const key = Object.keys(browserType_Percentages)[index];
    if (key) {
      browserList.style.width = browserType_Percentages[key] + "%";
    }
  });
  // SNS 유입에 width전달
  trafficSocial_list.forEach((socialList, index) => {
    const key = Object.keys(socialType_Percentages)[index];
    if (key) {
      socialList.style.width = socialType_Percentages[key] + "%";
    }
  });

  // hover시 tooltip 이벤트
  traffic_dataWrap.forEach((dataWrap) => {
    // 마우스 올라가면 tiptool 만들기
    dataWrap.addEventListener("mouseenter", function () {
      // tiptool 요소가 있는지 확인
      let existingTiptool = this.querySelector("#traffic_tiptool");
      let current_Content;

      // 마우스가 올라간 카테고리 구별
      let data_liElems = this.querySelectorAll("li");
      
      // tiptool 없으면 tiptool 요소 생성
      if (!existingTiptool) {
        let tiptool = document.createElement("div");
        let tiptool_value = document.createElement("p");
        let tiptool_data = document.createElement("p");
        tiptool.id = "traffic_tiptool";
        this.appendChild(tiptool);
        tiptool.appendChild(tiptool_value);
        tiptool.appendChild(tiptool_data);

        data_liElems.forEach((data_liElem) => {
          data_liElem.addEventListener("mouseenter", function () {
            current_Content = this.textContent;
            let per = this.offsetWidth;
            tiptool_value.textContent = current_Content;
            tiptool_data.textContent = `${per}명 유입`;
          });
        });
      }

      // 마우스 움직이면 따라 움직이기
      this.addEventListener("mousemove", function (e) {
        existingTiptool = this.querySelector("#traffic_tiptool");
        let mouseX = e.clientX;
        let mouseY = e.clientY;
        existingTiptool.style.left = mouseX + "px";
        existingTiptool.style.top = mouseY + "px";
      });
    });

    // 마우스 떠나면 tiptool 요소 제거
    dataWrap.addEventListener("mouseleave", function () {
      let existingTiptool = this.querySelector("#traffic_tiptool");

      if (existingTiptool) {
        existingTiptool.remove();
      }
    });
  });
}

// 실시간 인기도서 ####################################################
function popularList() {
  // 새로고침하면 인기도서 순위 변경
  const popular_Books = document.getElementById("popular-Books"); // 실시간 인기도서 영역
  const popularList = popular_Books.querySelector("ol#popular-Books-list"); // 실시간 인기도서 리스트
  const popularList_Elems = popularList.querySelectorAll("li"); //
  const popularList_shuffleButton = popular_Books.querySelector(".data-refresh"); // 실시간 인기도서 새로고침 버튼

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
      const randomIndex = Math.floor(Math.random() * statuses.length);
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
          popularList_Array[idx].nowRank = popularList_Array[idx].nowRank;
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

// 콘텐츠 이용 비율 ####################################################
function contentStatus() {
  const contentStatus_data = {
    labels: ["전자책", "오디오북", "챗북"], // X축 값
    datasets: [
      {
        label: false, // 데이터 세트가 무엇을 의미하는지
        data: [52, 38, 10], // Y축 값
        borderColor: "transparent", // 선 색상
        backgroundColor: ["#E0C1FF", "#FFF298", "#EDEDED"],
        cutout: "55%", // 도넛 중심 크기 조절
        radius: 100, // 기본적으로 모든 세그먼트는 80 (%로 하면 반응형)
        // hoverOffset: 12, // 호버시 크기 변화
        hoverBorderWidth: 7, // 호버시 보더 두께
        hoverBorderColor: ["#CB97FF", "#FFEC6F", "#D5D5D5"], // 호버시 보더 색상 변화
      },
    ], // datasets
  };

  const contentStatus_config = {
    type: "doughnut", // 그래프 유형
    data: contentStatus_data,
    options: {
      rotation: -45 * Math.PI, // 시작지점 변화
      responsive: true, // 화면 크기 변경 시 차트 크기 자동 조정
      maintainAspectRatio: false, // 비율을 유지하지 않음
      circumference: 360, // 보이는 차트 크기
      animation: {
        animateRotate: true, // 처음에 회전하면서 생성
        animateScale: true, // 처음에 커지면서 생성
        duration: 1000, // 애니메이션 지속 시간
      },
      plugins: {
        legend: {
          display: true,
          position: "right",
          align: "start",
          labels: {
            usePointStyle: true,
            padding: 15,
            boxWidth: 8, // 아이콘 너비
            boxHeight: 8, // 아이콘 높이
            font: {
              size: 8,
            },
          },
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              const index = tooltipItem.dataIndex;
              const value = tooltipItem.raw;
              return `${value}%`; // 툴팁에 라벨과 값을 표시
              // return `${contentStatus_data.labels[index]}: ${value}%`;
            },
          },
        },
        // tooltip: false,
      },

      // onHover: (event, activeElements) => {
      //   console.log(activeElements)
      // },

      interaction: {
        mode: "nearest", // hover 시 가까운 데이터 요소에 반응
        intersect: false,
      },
    },
  };

  // 차트 그리기
  const contentStatus_ctx = document.getElementById("content-Status").querySelector("canvas").getContext("2d");
  const contentStatus_Chart = new Chart(contentStatus_ctx, contentStatus_config);
}

// 문의 ####################################################
function inquiryBoard() {
  const inquiryBoard = document.getElementById("inquiry");
  const inquiry_listWrap = document.getElementById("inquiry_list");
  const inquiry_list = inquiry_listWrap.querySelectorAll("li");

  for (let idx = 0; idx < inquiryData.length; idx++) {
    const li = document.createElement("li");

    const idElement = document.createElement("span");
    idElement.className = "inquiry_id";
    idElement.textContent = inquiryData[idx].id;
    li.appendChild(idElement);

    const contentElement = document.createElement("p");
    contentElement.className = "inquiry_content";
    contentElement.textContent = inquiryData[idx].content;
    li.appendChild(contentElement);

    const badgeElement = document.createElement("i");
    badgeElement.className = "inquiry_badge";
    badgeElement.textContent = inquiryData[idx].badgeBollean === "true" ? "New" : "";
    li.appendChild(badgeElement);

    inquiry_listWrap.appendChild(li);
  }
}

// 현재 날짜 출력(데일리, 유입경로) ####################################################
function updateDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  // 데일리에 yyyy.mm.dd (hh:mm) 출력
  const formattedDateTime = `${year}.${month}.${day} (${hours}:${minutes})`;
  document.getElementById("dailyinform").querySelector(".datetime").textContent = formattedDateTime;

  // 유입경로에 yyyy.mm 출력
  const trafficDateTime = `${year}.${month}`;
  document.getElementById("trafficSource").querySelector(".datetime").textContent = trafficDateTime;

  // 콘텐츠 이용비율에 yyyy.mm 출력
  document.getElementById("content-Status").querySelector(".datetime").textContent = trafficDateTime;
}
setInterval(updateDateTime, 1000);
// #######################################

usageStatus(); //#이용현황
popularList(); //#실시간 인기도서
dailyInformation(); //#데일리
trafficSource(); //#유입경로
contentStatus(); //#콘텐츠 이용비율
inquiryBoard(); //#문의
