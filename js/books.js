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
    categoryIdx = idx;
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
    responsive: true, // false 크기를 고정으로
    maintainAspectRatio: true, // 기본값 true, 비율 유지
    plugins: {
      legend: {
        display: false, // false 범례 숨기기
      },
    },
    animation: 1000,
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
function mediaContent_chart() {}
mediaContent_chart();
