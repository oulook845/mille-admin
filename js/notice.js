import { feedManager_book } from "./noticeData.js";

// 피드 관리 ####################################################

let default_cate = feedManager_book.post;

function feedManage() {
  let liElem = $("#feedManage #feedList_con").html();

  let i = 0;
  let repeatCount = Number($("#feedList_con").attr("data-length")) - 1;
  while (i < repeatCount) {
    $("#feedManage #feedList_con").append(liElem);
    i++;
  }

  // 책정보 자동넣기
  $("#feedList_con li").each((idx, elem) => {
    let $nowLiElem = $("#feedManage #feedList_con li").eq(idx);
    $nowLiElem.find(".user_name .name").text(default_cate[idx].users_name);
    $nowLiElem.find(".img img").attr("src", `./images/books/feedBook_${default_cate[idx].imgSrc}.png`);
    $nowLiElem.find(".book_name").text(default_cate[idx].book_name);
    $nowLiElem.find(".book_desc").text(default_cate[idx].book_desc);
  });

  /* 탭메뉴 클릭 이벤트 */
  $("#feedManage .feedList_tap")
    .find("li")
    .on("click", function () {
      // 탭메뉴 스타일 변화
      $("#feedManage .feedList_tap").find("li").removeClass("selected");
      $(this).addClass("selected");

      // 책 리스트 변화
      let nowCate = $(this).attr("data-bookCate"); // 카테고리 클릭
      let nowCase = $(this).attr("data-case");

      let showCate = feedManager_book[nowCate]; // 현재 보이는 카테고리

      $("#feedManage #feedList_con").removeClass();
      $("#feedManage #feedList_con").addClass(nowCase);

      $("#feedList_con li").each((idx, elem) => {
        let $nowLiElem = $("#feedManage #feedList_con li").eq(idx);
        $nowLiElem.find(".user_name .name").text(showCate[idx].users_name);
        $nowLiElem.find(".img img").attr("src", `./images/books/feedBook_${showCate[idx].imgSrc}.png`);
        $nowLiElem.find(".book_name").text(showCate[idx].book_name);
        $nowLiElem.find(".book_desc").text(showCate[idx].book_desc);
      });
    });

  /* 댓글 좋아요 카운트 */
  $("#feedManage .post ").on("click", function () {
    let nowCount = Number($(this).find(".count").html());
    nowCount++;
    $(this).find(".count").html(nowCount);
  });
  $("#feedManage .likes").on("click", function () {
    let nowCount = Number($(this).find(".count").html());
    nowCount++;
    $(this).find(".count").html(nowCount);
  });
}
feedManage();

// 도서 리뷰 ####################################################
function booksRreview() {
  // enter 누르면 검색
  $("#book_search").on("keydown", function (e) {
    if (e.key === "Enter" || e.keyCode === 13) {
      searchBook_input();
    }
  });
  // 검색 아이콘 누르면 검색
  $("#bookReview .search_icon").click(function () {
    searchBook_input();
  });

  function searchBook_input() {
    // 검색어를 가져오고 초기화
    let search_bookName = $("#book_search").val();
    $("#book_search").val("");

    // 검색가능한 책 이름인지 확인
    if (typeof search_bookName === "string" && search_bookName.trim() !== "" && search_bookName.trim() !== undefined) {
      $("#book_search").attr("placeholder", search_bookName);
      searchBook(search_bookName);
    }
  }

  // 객체에서 책 찾기
  function searchBook(srch_bookName) {
    // 데이터 입력한 책 이름과 동일한 값를 찾음
    for (let idx = 0; idx < default_cate.length; idx++) {
      let cate = default_cate[idx];
      if (srch_bookName == cate.book_name) {
        $("#bookReview .bookReview_wrap .img img").attr("src", `./images/books/reviewBook_${cate.imgSrc}.png`);
        $("#bookReview .bookReview_wrap .book_name").text(cate.book_name);
        break;
      }
    }
  }
  
  // 도서 리뷰 로딩시 애니메이션
  $("#bookReview .total ul").addClass("on");
  $("#bookReview .total ul li").each(function (idx) {
    $(this)
      .find(".gaege span")
      .css({ transitionDelay: idx * 0.1 + "s" });
  });

  // 한 줄 리뷰 정렬 순서 선택
  $("#bookReview .review_area .seleted").click(function () {
    $("#bookReview .review_area .options").stop().slideToggle();
  });
  $("#bookReview .review_area .options li").click(function () {
    let option = $(this).text();
    $("#bookReview .review_area .seleted .cate_txt").text(option);
    $("#bookReview .review_area .options").stop().slideUp(0);
  });
}
booksRreview();

function noticeArea(){
  $('#noticeArea .noticeList li').click(function(){
    $('#noticeArea .noticeList li').find('.desc').stop().slideUp();
    $(this).find('.desc').stop().slideToggle();
  })
}
noticeArea();

function inquiryArea(){
  $('#inquiryArea .inquiryList li').click(function(){
    $('#inquiryArea .inquiryList li').find('.desc').stop().slideUp();
    $(this).find('.desc').stop().slideToggle();
  })
}
inquiryArea();