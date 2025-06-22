import { nowData } from "./common.js";
import { bookList } from "./booksData.js";

const popularBooksElem = document.getElementById("popularBooks"),
  bookCategoryElem = popularBooksElem.querySelector(".bookCategory"),
  categorylistElems = bookCategoryElem.querySelectorAll("li"),
  selectWrapElem = popularBooksElem.querySelector(".selectWrap"),
  selectTitleElem = selectWrapElem.querySelector(".title .txt"),
  selectConElems = selectWrapElem.querySelectorAll(".selectBox span"),
  booksWrapElem = popularBooksElem.querySelector(".booksWrap"),
  booksListElems = booksWrapElem.querySelectorAll(".bookList li");
const popularKeywordElem = document.getElementById("popularKeyword");

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
