export function sortable(){
  const container = document.getElementById("container");
  let columns = document.querySelectorAll(".column");
  const items = container.querySelectorAll(".dragger");
  
  // columns
  columns.forEach((column) => {
    // sortable : 드래그해서 위치 옮기기
  
    if (column.childElementCount <= 1) {
      column.classList.add("no-drag");
    }
  
    new Sortable(column, {
      group: "shared", // 여러 column을 하나의 그룹으로 묶음
      // animation: 150, // 애니메이션 속도
      ghostClass: "blue-background-class", // 움직이는 요소에게 클래스를 주어 스타일 변경 가능
      filter: ".no-drag", // 드래그를 차단할 조건
      preventOnFilter: true, // filter 조건에 맞는 요소는 드래그 차단
  
      onEnd: (evt) => {
        let currentColumn = evt.from; // 이벤트 일어난 column
        // console.log(evt);
        const current_items = currentColumn.querySelectorAll(".dragger"); // 이벤트 일어난 column의 dragger만 선택
  
        // if (current_items.length > current_items.length - 1) {
        //   for (all_item of items) {
        //     all_item.classList.remove("no-drag");
        //   } // 드래그 차단 해제
        // }
  
        oneList_dragDisable(column, currentColumn);
        scaleCheck();
      },
    });
  
    // dragger이 하나 있을 때 선택 못하게
    function oneList_dragDisable(column, currentColumn) {
      for (column of columns) {
        column.classList.remove("no-drag");
        if (column.childElementCount <= 1) {
          column.classList.add("no-drag");
        }
      }
    }
    oneList_dragDisable();
  });
  
  
  /////////////////////////////////////////////////////
  // .draggers 크기 업데이트
  function scaleCheck() {
    items.forEach((dragger) => {
      const contents = dragger.querySelector(".content");
  
      // dragger 크기 자동 지정
      let dragger__scale = dragger.getAttribute("data-area");
      dragger.style.flex = dragger__scale;
  
      // let drg__width = dragger.offsetWidth;
      // let w_value = 300;
      // 200보다 작으면 배경색상 변화
      // for (let i = 0; i < items.length; i++) {
      //   if (drg__width < w_value) {
      //     // dragger.style.backgroundColor = "#333";
      //     // contents.style.display = "none";
      //   } else {
      //     // dragger.style.backgroundColor = "#fff";
      //     // contents.style.display = "block";
      //   }
      // }
    });
  }
  scaleCheck();
  
  // window.addEventListener("resize", function () {
  //   scaleCheck();
  // });
  
}
