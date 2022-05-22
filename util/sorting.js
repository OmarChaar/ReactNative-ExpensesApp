
export function sortByLatest(list) {
  const tempList = [...list];
  return tempList.sort((a, b) => {
    return b.date - a.date;
  });
}

export function sortByOldest(list) {
  const tempList = [...list];
  return tempList.sort((a, b) => {
    return a.date - b.date;
  });
}