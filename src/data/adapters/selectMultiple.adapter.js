export const getCategoryList = (data) => {
  let categories = [];
  for (let i = 0, len = data.length; i < len; i++) {
    categories[data[i].id] = data[i].category;
  }
  let RemoveDuplicates = categories.filter((item, position) => {
    return categories.indexOf(item) == position;
  });
  return RemoveDuplicates;
};

export const getPaginationArray = (input, list, page, rowsPerPage) => {
  let lasItem = (+page + 1) * rowsPerPage;
  let firstItem = lasItem - rowsPerPage;
  let cloneList = getFilteredArray(input, list);
  cloneList = cloneList.filter((val, index) => {
    return index >= firstItem && index < lasItem;
  });

  return cloneList;
};

export const getFilteredArray = (input, list) => {
  let cloneList = list;

  if (input.length > 0) {
    cloneList = list.filter((val) => {
      return input.includes(val.category);
    });
  }
  return cloneList;
};
