const categories = [
  {
    key: 'algorithm',
    main_category: '알고리즘',
    value: ["브루트포스", "그래프", "그리디", "다이나믹 프로그래밍", "수학", "정렬", "트리", "자료구조",
      "분할 정복", "문자열", "기타"]
  },
  {
    key: 'study',
    main_category: '스터디',
    value: ["서울", "부산", "대구", "경기도", "인천", "광주", "대전", "울산", "세종", "강원", "충청북도",
      "충청남도", "전라북도", "전라남도", "경상북도", "경상남도", "제주"]
  },
  {
    key: 'job',
    main_category: '취업',
    value: ["웹", "게임", "모바일", "보안", "인공지능", "데이터", "임베디드", "벡엔드", "프론트엔드", "웹 풀스텍",
      "머신러닝", "게임 클라이언트", "게임 서버", "시스템/네트워크", "QA", "IOT", "블록체인",
      "응용 프로그램"]
  },
  {
    key: 'book',
    main_category: '도서',
    value: ["도서 추천", "도서 리뷰"],
  },
  {
    key: 'question',
    main_category: '코딩질문',
    value: [],
  },
  {
    key: 'freeTalk',
    main_category: '자유게시판',
    value: [],
  }
];

const getCategories = () => JSON.stringify(categories);

module.exports = {getCategories};