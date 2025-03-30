import { nowData } from "./common.js";

/*
nowData ={
    year
    month
    day
    hours
    minutes
    seconds
}
*/

// 방문자 통계 ####################################################
function Statistics(){
    const userStatistics = document.getElementById("users-statistics");
    // 일간 사용자
    const userDay = document.getElementById("users-day");
    const userDay_date = userDay.querySelector(".txt-day");
    const userDay_than = userDay.querySelector(".thanData");
    // 월간 사용자
    const userMonth = document.getElementById("users-month");
    const userMonth_date = userMonth.querySelector(".txt-day");;
    const userMonth_than = userMonth.querySelector(".thanData");;
    // 재방문자
    const userReturn = document.getElementById("users-return");
    
    
    userDay_date.textContent = `${nowData.year}년 ${nowData.month}월 ${nowData.day}일`;
    userMonth_date.textContent = `${nowData.year}년 ${nowData.month}월`
};
Statistics();