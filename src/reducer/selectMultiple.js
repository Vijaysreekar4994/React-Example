export default function (
  filterMultiple = {
    Category: [],
  },
  action
) {
  if (action.type === "filter") {
    // console.log(action);
    const newFilterMultiple = filterMultiple;
    for (let i = 0; i < action.filterMultiple.length; i++) {
      newFilterMultiple[Object.keys(action.filterMultiple[i])] = Object.values(
        action.filterMultiple[i]
      );
    }
    // console.log(newFilterMultiple, "newFilterMultiple");
    return newFilterMultiple;
  } else if (action.type === "removeFilter") {
    const newFilterMultiple = {
      Category: [],
    };
    return newFilterMultiple;
  }
  return filterMultiple;
}
