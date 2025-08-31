import { nowData } from "./common.js";
import { bookList } from "./booksData.js";

/* 인기 도서 순위 dom요소 */
const popularBooksElem = document.getElementById("popularBooks"),
  bookCategoryElem = popularBooksElem.querySelector(".bookCategory"),
  categorylistElems = bookCategoryElem.querySelectorAll("li"),
  selectWrapElem = popularBooksElem.querySelector(".selectWrap"),
  selectTitleElem = selectWrapElem.querySelector(".title .txt"),
  selectConElems = selectWrapElem.querySelectorAll(".selectBox span"),
  booksWrapElem = popularBooksElem.querySelector(".booksWrap"),
  booksListElems = booksWrapElem.querySelectorAll(".bookList li");
/* 밀리 인기 키워드 dom요소 */
const popularKeywordElem = document.getElementById("popularKeyword");
/* 장르별 이용 현황 dom요소 */
const genreStatsdElem = document.getElementById("genreStats"),
  selectBtnElems = genreStatsdElem.querySelectorAll(".selectBtn"),
  selectElems = genreStatsdElem.querySelectorAll(".select"),
  infoPerElem = genreStatsdElem.querySelector(".summary span.per");

/* 인기 도서 순위 ###################### */

// 카테고리 선택
let category = categorylistElems[0].getAttribute("data-category"); // 카테고리 공통 저장
categorylistElems.forEach((list, idx) => {
  list.addEventListener("click", function () {
    category = this.getAttribute("data-category");
    categorylistElems.forEach((remove) => {
      remove.classList.remove("on");
    });
    list.classList.add("on");
    hideBookList(); // 책 리스트 숨기기
    setTimeout(showBookList, 100); // 책 리스트 차례대로 보이기
    booksCategoryTrans(category);
  });
});

// 기간 선택 버튼에 class toggle
selectWrapElem.addEventListener("click", function () {
  selectWrapElem.classList.toggle("on");
});
// 기간 일간/주간/월간 선택
selectConElems.forEach((option) => {
  option.addEventListener("click", function () {
    let selectValue = option.getAttribute("data-period");
    let period;
    let periodAtrray = [];
    switch (selectValue) {
      case "일간":
        period = "id";
        break;
      case "주간":
        period = "weekRank";
        break;
      case "월간":
        period = "monthRank";
        break;
    }
    selectTitleElem.textContent = selectValue;
    booksListElems.forEach((liElem, idx) => {
      periodAtrray.push(bookList[category][idx][period]);
    });
    hideBookList(); // 책 리스트 숨기기
    booksShuffle(periodAtrray);
    setTimeout(showBookList, 100); // 책 리스트 차례대로 보이기
  });
});

// 리스트 차례대로 나오기
function showBookList() {
  booksListElems.forEach((book, idx) => {
    book.style.opacity = 1;
    book.style.transform = "translateY(0)";
    book.style.transition = "0.5s";
    book.style.transitionDelay = `${idx * 0.1}s`;
  });
}
showBookList(); // 책 리스트 차례대로 보이기

// 리스트 숨기기
function hideBookList() {
  booksListElems.forEach((book, idx) => {
    book.style.opacity = 0;
    book.style.transform = "translateY(-20px)";
    book.style.transition = "0s";
    book.style.transitionDelay = `0s`;
  });
}

// 카테고리에 따라 책 리스트 변경
function booksCategoryTrans(category) {
  booksListElems.forEach((liElem, idx) => {
    liElem.querySelector("img").setAttribute("src", bookList[category][idx].imgSrc);
    liElem.querySelector(".rank .num").textContent = idx + 1;
    liElem.querySelector(".bookName").textContent = bookList[category][idx].bookName;
    liElem.querySelector(".bookWriter").textContent = bookList[category][idx].bookWriter;
    liElem.querySelector(".bookPoint .txt").textContent = bookList[category][idx].bookPoint;
  });
}
// 기간 선택시 책 리스트 변경
function booksShuffle(period) {
  booksListElems.forEach((liElem, i) => {
    let idx = period[i];
    liElem.querySelector("img").setAttribute("src", bookList[category][idx].imgSrc);
    liElem.querySelector(".rank .num").textContent = i + 1;
    liElem.querySelector(".bookName").textContent = bookList[category][idx].bookName;
    liElem.querySelector(".bookWriter").textContent = bookList[category][idx].bookWriter;
    liElem.querySelector(".bookPoint .txt").textContent = bookList[category][idx].bookPoint;
  });
}

/* 밀리 인기 키워드 ###################### */
function newAccession() {
  const timeText = popularKeywordElem.querySelector("p.timeText");
  timeText.textContent = `${nowData.year}.${nowData.month}.${nowData.day} (${nowData.hours}:${nowData.minutes})`;
  const refreshBtn = popularKeywordElem.querySelector(".data-refresh");

  // 날짜 새로고침
  refreshBtn.addEventListener("click", function () {
    const nowData = updateDateTime();
    timeText.textContent = `${nowData.year}.${nowData.month}.${nowData.day} (${nowData.hours}:${nowData.minutes})`;
  });
}
newAccession();

// 날짜 업데이트 함수
function updateDateTime() {
  const now = new Date();
  const formatDate = (date) => {
    return {
      year: date.getFullYear(),
      month: String(date.getMonth() + 1).padStart(2, "0"),
      day: String(date.getDate()).padStart(2, "0"),
      hours: String(date.getHours()).padStart(2, "0"),
      minutes: String(date.getMinutes()).padStart(2, "0"),
      seconds: String(date.getSeconds()).padStart(2, "0"),
    };
  };
  return formatDate(now);
}

/* 장르별 이용 현황 ###################### */
function genreStats() {
  // 오늘 날짜 표시
  $("#genreStats p.timeText").text(`${nowData.year}.${nowData.month} 기준`);

  // 카테고리 버튼 열고 닫기
  selectBtnElems.forEach((btn, idx) => {
    const arrow = btn.querySelector(".down_arrow");
    const selectElem = selectElems[idx];
    // 현재 상태 확인
    let isOpen = false;

    btn.addEventListener("click", function () {
      if (!isOpen) {
        // 열기
        $(".down_arrow").css({ transform: "rotate(0deg)" });
        $("#genreStats .select").css({ display: "none" });
        arrow.style.transform = "rotate(180deg)";
        selectElem.style.display = "block";
        isOpen = true;
      } else {
        // 닫기
        arrow.style.transform = "rotate(0deg)";
        selectElem.style.display = "none";
        isOpen = false;
      }
    });

    // 새로운 카테고리 선택시 %값 수정
    const selectUlElem = selectElem.querySelector("ul"),
      selectList = selectUlElem.querySelectorAll("li");

    selectList.forEach((liElem) => {
      liElem.addEventListener("click", function () {
        const value = liElem.textContent;
        $(".down_arrow").css({ transform: "rotate(0deg)" });
        $("#genreStats .select").css({ display: "none" });
        let per = Math.floor(Math.random() * (70 - 30 + 1)) + 30;
        infoPerElem.textContent = `${per}%`;

        $(this).closest(".selectBox").find(".selectBtn span").text(value);
      });
    });
  });
}
genreStats();
// 장르별 이용 현황 차트
function genreStats_chart() {
  const ctx = document.getElementById("genreStats").querySelector("canvas").getContext("2d");
  const labelsElem = document.getElementById("genreStats_list");

  Chart.Tooltip.positioners.outer = function (elements) {
    if (!elements.length) {
      return false;
    }

    // 첫 번째 slice의 중심 좌표
    const el = elements[0].element;

    // 각 slice의 중간 각도 계산
    const midAngle = (el.startAngle + el.endAngle) / 2;

    // 원 중심 좌표
    const cx = el.x;
    const cy = el.y;

    // 바깥쪽 이동 거리
    const distance = el.outerRadius * 1.5;

    // 새 위치 계산 (polar to cartesian)
    const x = cx + distance * Math.cos(midAngle);
    const y = cy + distance * Math.sin(midAngle);

    return {
      x: x,
      y: y,
    };
  };

  const labels_array = [
    "취미/실용",
    "매거진",
    "판타지/무협",
    "어린이/청소년",
    "인문/교양",
    "시/에세이",
    "경제/경영",
    "소설",
    "자기계발",
  ];
  const data = [3, 5, 7, 8, 9, 10, 13, 18, 27];
  const bgColor = ["#431473", "#4F009F", "#6200C4", "#8B16FF", "#A143FF", "#B871FF", "#D3A7FF", "#E5CCFF", "#F3E6FF"];

  labels_array.forEach((label, idx) => {
    // console.log(label)
    const label_list = document.createElement("li");
    const label_badge = document.createElement("span");

    label_list.textContent = label;
    labelsElem.prepend(label_list);
    label_list.prepend(label_badge);
    label_badge.style.backgroundColor = bgColor[idx];
  });

  const options = {
    rotation: 100, // 기본단위 deg
    responsive: true, // false 크기를 고정으로
    maintainAspectRatio: true, // 기본값 true, 비율 유지
    animation: {
      duration: 1000,
    },
    plugins: {
      legend: {
        display: false, // false 범례 숨기기
      },
      tooltip: {
        mode: "nearest", // 툴팁 표시도 가장 가까운 데이터만
        displayColors: false, // false 네모 색상박스 제거
        yAlign: "none",
        position: "outer",

        bodyAlign: "center", // 본문 중앙 정렬
        borderWidth: 0.5,
        borderColor: "#222",
        backgroundColor: "#fff",

        padding: {
          top: 10,
          left: 10,
          bottom: 5,
          right: 10,
        },

        titleColor: "#222",
        titleFont: {
          weight: "normal",
          size: 8,
          lineHeight: 0.5,
        },

        bodyColor: "#9747FF",
        bodyFont: {
          weight: "bold",
          size: 8,
        },

        callbacks: {
          title: function (tooltipItems) {
            // 여러 tooltipItem이 있을 수 있으므로 첫 번째만 사용
            const idx = tooltipItems[0].dataIndex;
            return labels_array[idx];
          },
          label: function (tooltipItem) {
            const idx = tooltipItem.dataIndex;
            const value = data[idx];
            return value + "%";
          },
        },
      },
    },
  };
  const config = {
    type: "pie",
    data: {
      datasets: [
        {
          data: data,
          borderWidth: 0,
          backgroundColor: bgColor,
        },
      ],
    },
    options: options,
  };

  new Chart(ctx, config);
}
genreStats_chart();

/* 멀티 미디어 독서 컨텐츠 ###################### */
function mediaContent() {
  // 오늘 날짜 표시
  $("#mediaContent p.timeText").text(`${nowData.year}.${nowData.month} 기준`);
}
mediaContent();

// 멀티 미디어 독서 컨텐츠 차트
function mediaContent_chart() {
  const textArray = ["전자책", "오디오북", "챗북", "오브제북", "도슨트북"];

  const options = {
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // 범례 숨기기
      },
      tooltip: {
        enabled: false, // 툴팁 숨기기
      },
    },
  };

  // 전자책 차트
  function ebook_chart() {
    const ctx = document.getElementById("ebook").querySelector("canvas").getContext("2d");
    let text = "전자책"; // 가운데에 표시할 텍스트
    let per = 52;

    let centerTextPlugin = {
      id: "centerText",
      beforeDraw(chart) {
        const { width } = chart;
        const { height } = chart;
        const ctx = chart.ctx;
        ctx.restore();

        // 가운데 지점 위치
        const x = width / 2;
        const y = height / 2;

        const fontSize = (height / 100).toFixed(2); // 폰트 크기 자동 조절
        ctx.font = `600 ${fontSize * 12}px Pretendard-R`;
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";

        // 카테고리 텍스트
        ctx.fillStyle = "#000"; // 텍스트 색상
        ctx.fillText(text, x, y - fontSize * 8); //

        // 퍼센트 텍스트
        ctx.font = `400 ${fontSize * 10}px Pretendard-R`;
        ctx.fillText(`${per}%`, x, y + fontSize * 8); // 아래쪽에 배치
        ctx.save();
      },
    };

    const config = {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [per, 100 - per],
            backgroundColor: ["#A258F7", "transparent"], // 채워진 부분, 비어있는 부분 색상
            borderWidth: 0,
            cutout: "85%", // 도넛 중앙 크기
            borderRadius: 10,
          },
        ],
      },
      options: options,
      plugins: [centerTextPlugin],
    };

    new Chart(ctx, config);
  }
  ebook_chart();

  // 오디오북 차트
  function audiobook_chart() {
    const ctx = document.getElementById("audiobook").querySelector("canvas").getContext("2d");
    let text = "오디오북"; // 가운데에 표시할 텍스트
    let per = 28;

    let centerTextPlugin = {
      id: "centerText",
      beforeDraw(chart) {
        const { width } = chart;
        const { height } = chart;
        const ctx = chart.ctx;
        ctx.restore();

        // 가운데 지점 위치
        const x = width / 2;
        const y = height / 2;

        const fontSize = (height / 100).toFixed(2); // 폰트 크기 자동 조절
        ctx.font = `600 ${fontSize * 12}px Pretendard-R`;
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";

        // 카테고리 텍스트
        ctx.fillStyle = "#000"; // 텍스트 색상
        ctx.fillText(text, x, y - fontSize * 8); //

        // 퍼센트 텍스트
        ctx.font = `400 ${fontSize * 10}px Pretendard-R`;
        ctx.fillText(`${per}%`, x, y + fontSize * 8); // 아래쪽에 배치
        ctx.save();
      },
    };

    const config = {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [per, 100 - per],
            backgroundColor: ["#A258F7", "transparent"], // 채워진 부분, 비어있는 부분 색상
            borderWidth: 0,
            cutout: "85%", // 도넛 중앙 크기
            borderRadius: 10,
          },
        ],
      },
      options: options,
      plugins: [centerTextPlugin],
    };

    new Chart(ctx, config);
  }
  audiobook_chart();

  // 챗북 차트
  function chatbook_chart() {
    const ctx = document.getElementById("chatbook").querySelector("canvas").getContext("2d");

    let text = "챗북"; // 가운데에 표시할 텍스트
    let per = 10;

    let centerTextPlugin = {
      id: "centerText",
      beforeDraw(chart) {
        const { width } = chart;
        const { height } = chart;
        const ctx = chart.ctx;
        ctx.restore();

        // 가운데 지점 위치
        const x = width / 2;
        const y = height / 2;

        const fontSize = (height / 100).toFixed(2); // 폰트 크기 자동 조절
        ctx.font = `600 ${fontSize * 12}px Pretendard-R`;
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";

        // 카테고리 텍스트
        ctx.fillStyle = "#000"; // 텍스트 색상
        ctx.fillText(text, x, y - fontSize * 8); //

        // 퍼센트 텍스트
        ctx.font = `400 ${fontSize * 10}px Pretendard-R`;
        ctx.fillText(`${per}%`, x, y + fontSize * 8); // 아래쪽에 배치
        ctx.save();
      },
    };

    const config = {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [per, 100 - per],
            backgroundColor: ["#A258F7", "transparent"], // 채워진 부분, 비어있는 부분 색상
            borderWidth: 0,
            cutout: "85%", // 도넛 중앙 크기
            borderRadius: 10,
          },
        ],
      },
      options: options,
      plugins: [centerTextPlugin],
    };

    new Chart(ctx, config);
  }
  chatbook_chart();

  // 오브제북 차트
  function objectbook_chart() {
    const ctx = document.getElementById("objectbook").querySelector("canvas").getContext("2d");

    let text = "오브제북"; // 가운데에 표시할 텍스트
    let per = 3;

    let centerTextPlugin = {
      id: "centerText",
      beforeDraw(chart) {
        const { width } = chart;
        const { height } = chart;
        const ctx = chart.ctx;
        ctx.restore();

        // 가운데 지점 위치
        const x = width / 2;
        const y = height / 2;

        const fontSize = (height / 100).toFixed(2); // 폰트 크기 자동 조절
        ctx.font = `600 ${fontSize * 12}px Pretendard-R`;
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";

        // 카테고리 텍스트
        ctx.fillStyle = "#000"; // 텍스트 색상
        ctx.fillText(text, x, y - fontSize * 8); //

        // 퍼센트 텍스트
        ctx.font = `400 ${fontSize * 10}px Pretendard-R`;
        ctx.fillText(`${per}%`, x, y + fontSize * 8); // 아래쪽에 배치
        ctx.save();
      },
    };

    const config = {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [per, 100 - per],
            backgroundColor: ["#A258F7", "transparent"], // 채워진 부분, 비어있는 부분 색상
            borderWidth: 0,
            cutout: "85%", // 도넛 중앙 크기
            borderRadius: 10,
          },
        ],
      },
      options: options,
      plugins: [centerTextPlugin],
    };

    new Chart(ctx, config);
  }
  objectbook_chart();

  // 도슨트북 차트
  function docentbook_chart() {
    const ctx = document.getElementById("docentbook").querySelector("canvas").getContext("2d");

    let text = "도슨트북"; // 가운데에 표시할 텍스트
    let per = 7;

    let centerTextPlugin = {
      id: "centerText",
      beforeDraw(chart) {
        const { width } = chart;
        const { height } = chart;
        const ctx = chart.ctx;
        ctx.restore();

        // 가운데 지점 위치
        const x = width / 2;
        const y = height / 2;

        const fontSize = (height / 100).toFixed(2); // 폰트 크기 자동 조절
        ctx.font = `600 ${fontSize * 12}px Pretendard-R`;
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";

        // 카테고리 텍스트
        ctx.fillStyle = "#000"; // 텍스트 색상
        ctx.fillText(text, x, y - fontSize * 8); //

        // 퍼센트 텍스트
        ctx.font = `400 ${fontSize * 10}px Pretendard-R`;
        ctx.fillText(`${per}%`, x, y + fontSize * 8); // 아래쪽에 배치
        ctx.save();
      },
    };

    const config = {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [per, 100 - per],
            backgroundColor: ["#A258F7", "transparent"], // 채워진 부분, 비어있는 부분 색상
            borderWidth: 0,
            cutout: "85%", // 도넛 중앙 크기
            borderRadius: 10,
          },
        ],
      },
      options: options,
      plugins: [centerTextPlugin],
    };

    new Chart(ctx, config);
  }
  docentbook_chart();
}
mediaContent_chart();

/* 밀리 컨텐츠 ###################### */
// 밀리 컨텐츠 순위
function miileContent_day() {
  // 오늘 날짜 표시
  $("#milliContent p.timeText").text(
    `${nowData.year}.${nowData.month}.${nowData.day}(${nowData.hours}:${nowData.seconds})`
  );
}
miileContent_day();

// 밀리 컨텐츠 순위 변경
let content_array = [
  "밀리로드, 지금 이 작가야",
  "오늘 읽어야 할 단 한 권",
  "올타임 레전드",
  "밀리 시리즈",
  "에디터의 선택",
];
let article_array = ["밀리 아티클", "밀리의 발견", "밀리로그", "우리동네 책방", "독서 트렌드"];
``;

/* 인기 컨텐츠 카테고리 순위 */
function miile_popularContent() {
  /* 도서 추천 이벤트 */
  content_array.forEach((con, idx) => {
    $("#milliContent .book_pick ol").append(`<li><span class='rank'>${idx + 1}</span>${content_array[idx]}</li>`);
  });

  /* 아티클 */
  article_array.forEach((con, idx) => {
    $("#milliContent .millie_article ol").append(`<li><span class='rank'>${idx + 1}</span>${article_array[idx]}</li>`);
  });

  popularContent_ani();
}
miile_popularContent();

/* 인기 컨텐츠 카테고리 순위 애니메이션 */
function popularContent_ani() {
  // 기본 상태 (초기화)
  $("#milliContent .popular_content ol li").css({
    opacity: 0,
    transform: "translateY(100%)",
    transition: "0s",
  });
  $("#milliContent .millie_article ol li").css({
    opacity: 0,
    transform: "translateY(100%)",
    transition: "0s",
  });
  $("#milliContent .most_content .name").css({
    opacity: 0,
    transform: "translateY(100%)",
    transition: "0s",
  });

  // 올라오는 애니메이션
  setTimeout(() => {
    /* popular_content */
    $("#milliContent .popular_content ol li").css({
      opacity: 1,
      transform: "translateY(0)",
      transition: "0.5s",
    });
    content_array.forEach((liElem, idx) => {
      $("#milliContent .popular_content ol li")
        .eq(idx)
        .css({
          transitionDelay: `${0.1 * idx}s`,
        });
    });

    /* millie_article */
    $("#milliContent .millie_article ol li").css({
      opacity: 1,
      transform: "translateY(0)",
      transition: "0.5s",
    });
    article_array.forEach((liElem, idx) => {
      $("#milliContent .millie_article ol li")
        .eq(idx)
        .css({
          transitionDelay: `${0.1 * idx}s`,
        });
    });

    /* 카테고리 별 최다 이용 컨텐츠 : 책이름 */
    $("#milliContent .most_content .name").css({
      opacity: 1,
      transform: "translateY(0)",
      transition: "0.5s",
    });
  }, 100);
}

/* 카테고리 별 최다 이용 컨텐츠 */
function miile_mostContent() {
  $("#milliContent .most_content .con.pick").find(".name").text(content_array[0]);
  $("#milliContent .most_content .con.article").find(".name").text(article_array[0]);
}
miile_mostContent();

// 데이터 새로고침 버튼
$("#milliContent")
  .find(".data-refresh")
  .on("click", function () {
    content_array.sort(() => Math.random() - 0.5);
    article_array.sort(() => Math.random() - 0.5);

    // 기존 컨텐츠 지우고 다시 입력
    $("#milliContent .book_pick ol").html("");
    $("#milliContent .millie_article ol").html("");
    miile_popularContent();
    miile_mostContent();

    // 애니메이션 재실행
    popularContent_ani();
  });
