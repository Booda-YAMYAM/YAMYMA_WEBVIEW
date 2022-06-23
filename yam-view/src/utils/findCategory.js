export const findCategory = (category) => {
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
    default:
      return "기타";
  }
};
