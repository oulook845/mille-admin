// a[href='#'] 기본클릭 이벤트 제거
const noLinkAnchors = document.querySelectorAll("a[href='#']");
noLinkAnchors.forEach((noLinkAnchor) => {
  noLinkAnchor.addEventListener("click", function (e) {
    e.preventDefault();
  });
});

// nav 클릭시 보이는 콘텐츠 업데이트
const mainGnb = document.getElementById("main_gnb");
const mainGnb_links = mainGnb.querySelectorAll("li");
const sectionLists = document.querySelectorAll(".contentList");
const mainGnb_darkMode = mainGnb.querySelector("#dark-mode");
const root = document.documentElement;
console.log(mainGnb_links)
mainGnb_links.forEach((mainGnb_link, idx) => {
  mainGnb_link.addEventListener("click", function (e) {
    e.preventDefault();
    for (mainGnb_link of mainGnb_links) {
      mainGnb_link.classList.remove("list-active");
    }
    sectionLists.forEach((sectionList)=>{
      sectionList.classList.remove("currentViewSection");
    });
    sectionLists[idx].classList.add("currentViewSection");
    this.classList.add("list-active");
    console.log(this)
  });
});


// 다크모드 버튼 이벤트
// mainGnb_darkMode.addEventListener("click", darkMode_TransColor);
// let isDarkMode = true;
// function darkMode_TransColor(){
//     if(isDarkMode){
//         root.style.setProperty("--darkMode-white", "#222"); // 다크모드시 흰색을-> 검정색으로
//         root.style.setProperty("--darkMode-black", "#fff"); // 다크모드시 검정색을-> 흰색으로
//         isDarkMode = false;
//     }else{
//         root.style.setProperty("--darkMode-white", "#fff"); // 다크모드 취소
//         root.style.setProperty("--darkMode-black", "#222"); // 다크모드 취소
//         isDarkMode = true;
//     }
// }