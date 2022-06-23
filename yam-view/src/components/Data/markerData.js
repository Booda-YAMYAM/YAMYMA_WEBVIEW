// latitude : y축
// longitude : x축

export const markerdata = [
  {
    restaurantId: 1,
    restaurantName: "콜드스퀘어", // 이름
    restaurantNumber: "010-1111-1111", // 전화번호
    y_coordinate: 37.62197524055062, // 위도
    x_coordinate: 127.16017523675508, // 경도
    address: "대전광역시 00구 00동",
    heart: 3,
    category: "korea",
    menus: [
      {
        menuId: 1,
        menuName: "비빔밥",
        price: 10000,
        category: "korea",
        menuNum: 0,
      },
    ],
    OPEN_TIME: "오전 11:00 ~ 오후 11:00",
    SECTOR: "분식",
    MAIN_MENU: "돼지국밥, 돼지찜, 돼지전골",
    LAST_UPDATED: Date(),
    DATE_CREATED: Date(),
  },
  {
    restaurantId: 2,
    restaurantName: "하남돼지집",
    restaurantNumber: "010-2222-2222", // 전화번호
    y_coordinate: 37.620842424005616,
    x_coordinate: 127.1583774403176,
    address: "대전광역시 00구 00동",
    heart: 10,
    category: "korea",
    menus: [
      {
        menuId: 1,
        menuName: "비빔밥",
        price: 10000,
        category: "korea",
        menuNum: 0,
      },
    ],
    OPEN_TIME: "오전 11:00 ~ 오후 11:00",
    SECTOR: "양식",
    MAIN_MENU: "파스터볶음, 치즈볶음, 치킨볶음",
    LAST_UPDATED: Date(),
    DATE_CREATED: Date(),
  },
  {
    restaurantId: 3,
    restaurantName: "수유리우동",
    restaurantNumber: "010-3333-3333", // 전화번호
    y_coordinate: 37.624915253753194,
    x_coordinate: 127.15122688059974,
    address: "대전광역시 00구 00동",
    heart: 20,
    category: "korea",
    menus: [
      {
        menuId: 1,
        menuName: "비빔밥",
        price: 10000,
        category: "korea",
        menuNum: 0,
      },
    ],
    OPEN_TIME: "오전 11:00 ~ 오후 11:00",
    SECTOR: "중식",
    MAIN_MENU: "짜장면, 짬뽕, 짬짜면",
    LAST_UPDATED: Date(),
    DATE_CREATED: Date(),
  },
  {
    restaurantId: 4,
    restaurantName: "맛닭꼬",
    restaurantNumber: "010-4444-4444", // 전화번호
    y_coordinate: 37.62456273069659,
    x_coordinate: 127.15211256646381,
    address: "대전광역시 00구 00동",
    OPEN_TIME: "오전 11:00 ~ 오후 11:00",
    heart: 5,
    category: "korea",
    menus: [
      {
        menuId: 1,
        menuName: "비빔밥",
        price: 10000,
        category: "korea",
        menuNum: 0,
      },
    ],
    SECTOR: "한식",
    MAIN_MENU: "닭꼬치, 닭볶음, 닭칠성",
    LAST_UPDATED: Date(),
    DATE_CREATED: Date(),
  },
];
