const noLinkAnchors = document.querySelectorAll("a[href='#']");
noLinkAnchors.forEach((noLinkAnchor) => {
  noLinkAnchor.addEventListener("click", function (e) {
    e.preventDefault();
  });
});

const mainGnb = document.getElementById("main_gnb");
const mainGnb_links = mainGnb.querySelectorAll("li");
const mainGnb_darkMode = mainGnb.querySelector("#dark-mode");
const root = document.documentElement;

mainGnb_links.forEach((mainGnb_link) => {
  mainGnb_link.addEventListener("click", function (e) {
    e.preventDefault();
    for (mainGnb_link of mainGnb_links) {
      mainGnb_link.classList.remove("list-active");
    }
    this.classList.add("list-active");
  });
});


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