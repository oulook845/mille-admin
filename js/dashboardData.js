// dashboard에 필요한 모든 데이터를 각 센션마다 처리

// 이용현황 그래프 데이터 ##################################
export let usageStatus_Data = {
    labels : ["", "1.05", "1.06", "1.07", "1.08", "1.09", "1.10", "1.11", " "], // X축 값
    datasets : [583034, 723850, 520185, 620600, 510038, 838856, 610940, 793250, 793250], // Y축 값
}// data

// 유입경로 데이터 ##################################
export let trafficSource_Data = {
  browserType :{
    naver : 863,
    google : 571,
    daum : 292,
  },
  socialType : {
    instagram : 734,
    twitter : 639,
    facebook : 172,
  },
}

// 인기도서 데이터 ##################################
export let popularList_Array = [
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

// 문의 유저(아이디, 내용, 신규유무) 데이터 ##################################
export let inquiryData = [
  {
    userNum: "0",
    id: "hgs**57",
    content: "정기구독 이용 도중에 구독 취소나 해지가 가능한가요?",
    badgeBollean: "true",
  },
  {
    userNum: "1",
    id: "0ks**0f",
    content: "[IOS] 애플 환불 요청은 어떻게 하나요? (App Store)",
    badgeBollean: "true",
  },
  {
    userNum: "2",
    id: "gls**99",
    content: "휴대폰 본인확인 시, 인증문자가 수신되지 않아요.",
    badgeBollean: "false",
  },
  {
    userNum: "3",
    id: "aa0**ee",
    content: "로그인 방법을 변경하고 싶습니다.",
    badgeBollean: "false",
  },
  {
    userNum: "4",
    id: "lud**34",
    content: "해외에서도 가입할 수 있나요?",
    badgeBollean: "false",
  },
  {
    userNum: "5",
    id: "kmj**31",
    content: "종이책에서 보던 부분을 전자책에서 찾고 싶어요.",
    badgeBollean: "false",
  },
  {
    userNum: "6",
    id: "dfs**77",
    content: "오디오북 재생 종료를 예약할 수 있나요?",
    badgeBollean: "false",
  },
];


