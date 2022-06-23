export const findCategoryEtoK = (category) => {
  switch (category) {
    case "korea":
      return "한식";
    case "japan":
      return "일식";
    case "china":
      return "중식";
    case "western":
      return "양식";
    case "snack":
      return "분식";
    case "fastfood":
      return "패스트푸드";
    case "bakery":
      return "베이커리";
    case "cafe":
      return "카페";
    case "restaurant":
      return "레스토랑";
    case "bar":
      return "바";
    case "asian":
      return "아시안";
    case "dessert":
      return "디저트";
    case "convenience":
      return "편의점";
    default:
      return "기타";
  }
};

export const findCategoryKtoE = (category) => {
  switch (category) {
    case "한식":
      return "korea";
    case "일식":
      return "japan";
    case "중식":
      return "china";
    case "양식":
      return "western";
    case "분식":
      return "snack";
    case "패스트푸드":
      return "fastfood";
    case "베이커리":
      return "bakery";
    case "카페":
      return "cafe";
    case "레스토랑":
      return "restaurant";
    case "바":
      return "bar";
    case "아시안":
      return "asian";
    case "디저트":
      return "dessert";
    case "편의점":
      return "convenience";
    default:
      return "기타";
  }
};
