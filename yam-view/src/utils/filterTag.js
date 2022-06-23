export const filterTag = (arr, tagList) => {
  return arr.filter((item) => tagList.includes(item.category));
};
